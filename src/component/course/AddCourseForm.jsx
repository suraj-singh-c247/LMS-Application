import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import formStyles from "@/style/form.module.css";
import errorStyles from "@/style/error.module.css";
import { memo, useEffect, useState } from "react";
import Button from "../common/button/Button";
import { addcourseSchema, editcourseSchema } from "@/utilis/validation";
import { categoryServices } from "@/service/apiCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { courseServices } from "@/service/apiCourse";
import { tagsServices } from "@/service/apiTags";

const AddCourseForm = ({ id, data, getCourseData, onClose }) => {
  const [getCatergoryId, setCategoryId] = useState([]);
  const [tagsId, setTagsId] = useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(id ? editcourseSchema : addcourseSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      description: "",
      visibility: "",
      categoryId: "",
      tagIds: [],
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

  // get tags id
  useEffect(() => {
    tagsServices
      .getAllTags()
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setTagsId(data);
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
      const findUser = data.find((user) => user?.id === id);
      console.log(findUser?.tags, "edit");

      setValue("title", findUser?.title || "");
      setValue("description", findUser?.description || "");
      setValue("visibility", findUser?.visibility || "");
      setValue("categoryId", findUser?.category?.id || "");
      setValue("tagIds", []);
    } else {
      reset();
    }
  }, [open, data, id]);

  const onSubmit = (data) => {
    const formData = new FormData();
    console.log(data.coverImage[0], "coverImage[0]");

    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.coverImage && data.coverImage[0]) {
      formData.append("coverImage", data.coverImage[0]);
    }
    formData.append("visibility", data.visibility);
    formData.append("categoryId", data.categoryId);
    formData.append("tagIds", data.tagIds);

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
            label="Description*"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            maxRows={4}
            size="small"
            error={!!errors.description}
            helperText={errors.description?.message}
            className={formStyles.formControl}
          />
        )}
      />
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
      <Controller
        name="tagIds"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.tagIds}
            size="small"
            sx={{ mb: 2 }}
            className={formStyles.formControl}
          >
            <InputLabel id="tagId-label">Select Tag ID</InputLabel>
            <Select
              {...field}
              labelId="tagId-label"
              label="Select Tag ID"
              className={formStyles.formControl}
              multiple
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const tag = tagsId?.tags.find(
                        (item) => item?.id === value
                      );
                      return <Chip key={value} label={tag?.name} />;
                    })}
                  </Box>
                );
              }}
            >
              {tagsId?.tags?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
            {errors.tagId && (
              <Typography component={"span"} className={errorStyles.error}>
                {errors.tagId.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          type="button"
          variant={"cancel"}
          label={"Cancel"}
          onClick={onClose}
        />
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
