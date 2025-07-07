import { Paper, Typography } from "@mui/material";
import { memo } from "react";
import styles from "@/app/style/page.module.css";

const PageLayout = ({ title, children }) => {
  return (
    <Paper elevation={3} className={styles.paperMainBox}>
      {title && (
        <Typography component={"h2"} className={styles.pageHeading}>
          {title}
        </Typography>
      )}

      {children}
    </Paper>
  );
};

export default memo(PageLayout);
