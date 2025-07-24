import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import formStyles from "@/style/form.module.css";
import errorStyles from "@/style/error.module.css";
import { memo, useEffect } from "react";
import Button from "../common/button/Button";
import { chapterSchema } from "@/utilis/validation";
import { chapterServices } from "@/service/apiChapter";
import { sortOrderLists } from "@/utilis/utilities";
import CustomTextField from "../common/input/CustomTextField";

const AddEditChapter = ({ id, courseId, getDataTable, onClose }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(chapterSchema),
    defaultValues: {
      courseId: "",
      title: "",
      description: "",
      sortOrder: "",
    },
  });
  // It's use for edit
  useEffect(() => {
    if (id) {
      handleGetEachData();
    }
  }, []);

  const handleGetEachData = () => {
    chapterServices
      .getChapterById(id)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setValue("courseId", data?.course?.id || "");
          setValue("title", data?.title || "");
          setValue("description", data?.description || "");
          setValue("sortOrder", data?.sortOrder || "");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data?.message);
          return;
        } else if (error.request) {
          toast.error(error.request);
          return;
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  const onSubmit = (data) => {
    if (!id) {
      chapterServices
        .createChapter(data)
        .then((response) => {
          if (response?.status === 201) {
            const { message } = response?.data;
            getDataTable();
            toast.success(message);
            onClose();
            reset();
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data?.message);
            return;
          } else if (error.request) {
            toast.error(error.request);
            return;
          }
        });
    }

    if (id) {
      chapterServices
        .updateChapter(id, data)
        .then((response) => {
          if (response?.status === 200) {
            const { message } = response?.data;
            getDataTable();
            toast.success(message);
            onClose();
            reset();
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data?.message);
            return;
          } else if (error.request) {
            toast.error(error.request);
            return;
          }
        });
    }
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
    >
      <Controller
        name="courseId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.courseId}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel>Select course ID*</InputLabel>
            <Select
              {...field}
              label="Select Course ID*"
              className={formStyles.formControl}
            >
              {courseId?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
            {errors.courseId && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.courseId.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <CustomTextField
            field={field}
            label="Title*"
            error={!!errors?.title}
            helperText={errors?.title?.message}
          />
        )}
      />{" "}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <CustomTextField
            field={field}
            label="Description*"
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            minRows={2}
            maxRows={4}
          />
        )}
      />{" "}
      <Controller
        name="sortOrder"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.sortOrder}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel>Select Sort Order*</InputLabel>
            <Select
              {...field}
              label="Select Sort Order*"
              className={formStyles.formControl}
            >
              {sortOrderLists?.map((item) => (
                <MenuItem key={item?.id} value={item?.value}>
                  {item?.label}
                </MenuItem>
              ))}
            </Select>
            {errors.sortOrder && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.sortOrder.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Box className={formStyles.formFooter}>
        <Button
          type="button"
          variant="cancel"
          label="Cancel"
          onClick={onClose}
        />
        <Button
          type="submit"
          variant="primary"
          label={`${id ? "Update" : "Save"}`}
          disbaled={!!isSubmitting}
        />
      </Box>
    </Box>
  );
};
export default memo(AddEditChapter);
