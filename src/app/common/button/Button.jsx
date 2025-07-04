import { memo } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import btnStyles from "./button.module.css";

function CustomButton({ label, endIcon, onClick, ...props }) {
  return (
    <Box className={btnStyles.buttonContainer}>
      <Button
        className={`${btnStyles.btn} ${btnStyles.primaryButton}`}
        onClick={onClick}
        endIcon={endIcon}
        {...props}
      >
        {label}
      </Button>
    </Box>
  );
}

export default memo(CustomButton);
