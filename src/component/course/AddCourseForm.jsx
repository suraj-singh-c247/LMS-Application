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
import formStyles from "@/style/form.module.css";
import errorStyles from "@/style/error.module.css";
import { memo, useEffect, useState } from "react";
import Button from "../common/button/Button";
import { courseSchema } from "@/utilis/validation";
import { categoryServices } from "@/service/apiCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { courseServices } from "@/service/apiCourse";

const AddCourseForm = ({ id, data, getCourseData, onClose }) => {
  const [getCatergoryId, setCategoryId] = useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      description: "",
      visibility: "",
      categoryId: "",
    },
  });

  // get categories id
  useEffect(() => {
    categoryServices
      .getAllCategory()
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setCategoryId(data);
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
  }, []);

  // It's use for edit

  useEffect(() => {
    if (data && id) {
      const findUser = data.find((user) => user.id === id);
      setValue("title", findUser?.title || "");
      setValue("description", findUser?.description || "");
      setValue("visibility", findUser?.visibility || "");
      setValue("categoryId", findUser?.category?.id || "");
    } else {
      reset();
    }
  }, [open, data, id]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("visibility", data.visibility);
    formData.append("categoryId", data.categoryId);

    if (!id) {
      courseServices
        .createCourse(formData)
        .then((response) => {
          if (response?.status === 201) {
            const { message } = response?.data;
            getCourseData();
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
      courseServices
        .updateCourse(id, formData)
        .then((response) => {
          if (response?.status === 200) {
            const { message } = response?.data;
            getCourseData();
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
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={formStyles.formControl}
            label="Title*"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
            size="small"
            sx={{ mb: 2 }}
          />
        )}
      />{" "}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={formStyles.formControl}
            label="Description*"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
            size="small"
            sx={{ mb: 2 }}
          />
        )}
      />{" "}
      <Controller
        name="coverImage"
        control={control}
        render={() => (
          <TextField
            type="file"
            className={formStyles.formControl}
            variant="outlined"
            name="coverImage"
            label="CoverImage*"
            {...register("coverImage")}
            fullWidth
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.coverImage}
            helperText={errors.coverImage?.message}
          />
        )}
      />{" "}
      {/* Select Dropdown */}
      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.visibility}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel>Select Visibility*</InputLabel>
            <Select {...field} label="Select Visibility*">
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
            {errors.visibility && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.visibility.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.categoryId}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel>Select Category ID*</InputLabel>
            <Select
              {...field}
              label="Select Category ID*"
              className={formStyles.formControl}
            >
              {getCatergoryId?.categories?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.categoryId.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          type="submit"
          variant={"primary"}
          label={`${id ? "Update" : "Save"}`}
          disabled={!!isSubmitting}
        />
      </Box>
    </Box>
  );
};
export default memo(AddCourseForm);
