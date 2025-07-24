import React from "react";
import { TextField } from "@mui/material";

import formStyles from "@/style/form.module.css";

const CustomTextField = ({ field, label, variant, size, ...props }) => {
  return (
    <TextField
      {...field}
      className={formStyles.formControl}
      label={label}
      variant={variant || "outlined"}
      fullWidth
      margin="normal"
      size={size || "small"}
      {...props}
    />
  );
};

export default CustomTextField;
