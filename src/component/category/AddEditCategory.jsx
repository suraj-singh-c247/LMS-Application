import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import formStyles from "@/style/form.module.css";
import { memo, useEffect } from "react";
import Button from "../common/button/Button";
import { catergorySchema } from "@/utilis/validation";
import { categoryServices } from "@/service/apiCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const AddEditCategory = ({ id, categoryData, getDataTable, onClose }) => {
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
    },
  });
  // It's use for edit

  useEffect(() => {
    if (categoryData && id) {
      const findUser = categoryData.find((user) => user.id === id);
      setValue("name", findUser?.name || "");
    } else {
      reset();
    }
  }, [open, categoryData, id]);

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
        .updateCategory(id, data?.name)
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
          <TextField
            {...field}
            className={formStyles.formControl}
            label="Name*"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            size="small"
            sx={{ mb: 2 }}
          />
        )}
      />{" "}
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          type="submit"
          variant={"primary"}
          label={`${id ? "Update" : "Save"}`}
          disbaled={Boolean(!!isSubmitting)}
        />
      </Box>
    </Box>
  );
};
export default memo(AddEditCategory);
