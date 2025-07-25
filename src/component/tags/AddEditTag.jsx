import { Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import formStyles from "@/style/form.module.css";
import { memo, useEffect } from "react";
import Button from "../common/button/Button";
import { tagSchema } from "@/utilis/validation";
import { tagsServices } from "@/service/tags";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import CustomTextField from "../common/input/CustomTextField";

const AddEditTag = ({ id, getDataTable, onClose }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(tagSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (id) {
      getTagData();
    }
  }, []);

  // It's use for edit
  const getTagData = () => {
    tagsServices
      .getTagById(id)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setValue("name", data?.name || "");
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
      tagsServices
        .createTag(data)
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
          throw error;
        });
    }

    if (id) {
      tagsServices
        .updateTag(id, data)
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
          throw error;
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
            label="Name*"
            error={!!errors?.name}
            helperText={errors.name?.message}
            {...field}
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
          variant={"primary"}
          label={`${id ? "Update" : "Save"}`}
          disbaled={!!isSubmitting}
        />
      </Box>
    </Box>
  );
};
export default memo(AddEditTag);
