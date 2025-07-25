import { Box, Paper, Typography } from "@mui/material";
import { memo } from "react";
import styles from "@/style/page.module.css";
import Button from "./button/Button";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const PageLayout = ({ title, btnText, setAddOpen, children }) => {
  return (
    <Paper elevation={3} className={styles.paperMainBox}>
      <Box className={styles.mainHeadingBox}>
        {title && (
          <Typography component={"h2"} className={styles.pageHeading}>
            {title}
          </Typography>
        )}
        {btnText && (
          <Button
            label={btnText}
            variant={"primary"}
            startIcon={<AddOutlinedIcon />}
            onClick={() => setAddOpen({ open: true })}
            disabled={false}
          />
        )}
      </Box>
      {children}
    </Paper>
  );
};

export default memo(PageLayout);
