import { memo } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import btnStyles from "./button.module.css";

function CustomButton({ label, endIcon, variant, onClick, ...props }) {
  return (
    <Box className={btnStyles.buttonContainer}>
      <Button
        className={`${btnStyles.btn} ${
          variant === "primary"
            ? btnStyles.primaryButton
            : btnStyles.secondaryButton
        }`}
        onClick={onClick}
        endIcon={endIcon && endIcon}
        {...props}
      >
        {label}
      </Button>
    </Box>
  );
}

export default memo(CustomButton);
