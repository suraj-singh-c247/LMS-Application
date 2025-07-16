import React, { memo, useState } from "react";
import Button from "../common/button/Button";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import styles from "@/style/page.module.css";
import { tagsServices } from "@/service/apiTags";

const TagStatus = ({ text, id, handleGetData, singleData, onClose }) => {
  const [isSubmited, setIsSubmited] = useState(false);

  // handle status change
  const handleStatusChange = (e, id) => {
    e.preventDefault();
    const active = !singleData?.isActive;
    tagsServices
      .updateStatusTag(id, active)
      .then((response) => {
        if (response?.status === 200) {
          const { message } = response?.data;
          handleGetData();
          toast.success(message);
          onClose();
          setIsSubmited(true);
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
      onSubmit={(e) => handleStatusChange(e, id)}
    >
      <Typography variant="body1" className={styles.deleteText}>
        {text}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant={"primary"}
          label={"Okay"}
          disabled={isSubmited}
        />
      </Box>
    </Box>
  );
};

export default memo(TagStatus);
