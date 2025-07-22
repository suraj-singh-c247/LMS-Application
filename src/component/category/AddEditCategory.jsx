import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import formStyles from "@/style/form.module.css";
import { memo, useEffect } from "react";
import Button from "../common/button/Button";
import { catergorySchema } from "@/utilis/validation";
import { categoryServices } from "@/service/apiCategory";
import CustomTextField from "../common/input/CustomTextField";

const AddEditCategory = ({ id, getDataTable, onClose }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(catergorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  // It's use for edit
  useEffect(() => {
    if (id) {
      getCategoryData();
    }
  }, []);

  const getCategoryData = () => {
    categoryServices
      .getCategoryById(id)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setValue("name", data?.name || "");
          setValue("description", data?.description || "");
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

  const onSubmit = (data) => {
    if (!id) {
      categoryServices
        .createCategory(data)
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
      categoryServices
        .updateCategory(id, data)
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
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <CustomTextField
            label="Name*"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...field}
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
          variant="cancel"
          label="Cancel"
          onClick={onClose}
        />
        <Button
          type="submit"
          variant="primary"
          label={`${id ? "Update" : "Save"}`}
          disbaled={Boolean(!!isSubmitting)}
        />
      </Box>
    </Box>
  );
};
export default memo(AddEditCategory);
