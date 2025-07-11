import { memo } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import btnStyles from "./button.module.css";

function CustomButton({ label, variant, onClick, ...props }) {
  return (
    <Box className={btnStyles.buttonContainer}>
      <Button
        className={`${btnStyles.btn} ${
          variant === "primary"
            ? btnStyles.primaryButton
            : variant === "secondary"
            ? btnStyles.secondaryButton
            : variant === "error"
            ? btnStyles.errorButton
            : btnStyles.infoButton
        }`}
        onClick={onClick}
        {...props}
      >
        {label}
      </Button>
    </Box>
  );
}

export default memo(CustomButton);
