import { Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { memo, useEffect } from "react";
import Button from "../common/button/Button";
import { categorySchema } from "@/utilis/validation";
import { categoryServices } from "@/service/apiCategory";
import CustomTextField from "../common/input/CustomTextField";

import formStyles from "@/style/form.module.css";

const AddEditCategory = ({ id, getDataTable, onClose }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
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
      onKeyDown={handleKeyDown}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <CustomTextField
            field={field}
            label="Name*"
            error={!!errors.name}
            helperText={errors.name?.message}
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
export default memo(AddEditCategory);
