import React, { memo } from "react";
import Button from "../common/button/Button";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import styles from "@/style/page.module.css";
import { courseServices } from "@/service/apiCourse";

const DeleteCourse = ({ text, id, handleGetData, onClose }) => {
  const handleDelete = (e, id) => {
    e.preventDefault();
    courseServices
      .deleteCourse(id)
      .then((response) => {
        if (response?.status === 200) {
          const { message } = response?.data;
          toast.success(message);
          handleGetData();
          onClose();
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
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={(e) => handleDelete(e, id)}
    >
      <Typography variant="body1" className={styles.deleteText}>
        {text}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant={"error"} label={"Delete"} />
      </Box>
    </Box>
  );
};

export default memo(DeleteCourse);
