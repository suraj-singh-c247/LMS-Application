import { memo } from "react";
import Card from "./card/Card";
import { Grid } from "@mui/material";
import styles from "@/style/page.module.css";

const CourseBoard = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={4} className={styles.cardMainBox}>
        <Card />
      </Grid>
      <Grid size={4} className={styles.cardMainBox}>
        <Card />
      </Grid>
      <Grid size={4} className={styles.cardMainBox}>
        <Card />
      </Grid>
      <Grid size={4} className={styles.cardMainBox}>
        <Card />
      </Grid>
    </Grid>
  );
};

export default memo(CourseBoard);
