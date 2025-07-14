import { memo } from "react";

import { Grid } from "@mui/material";
import styles from "@/style/page.module.css";
import Card from "../card/Card";

const CourseBoard = ({ course }) => {
  return (
    <Grid container spacing={2}>
      {course &&
        course.map((item) => (
          <Grid key={item?.id} size={4} className={styles.cardMainBox}>
            <Card
              id={item?.id}
              image={`http://localhost:8000/${item?.coverImage}`}
              cartText={item?.description}
              visibility={item?.visibility}
              title={item?.title}
              subTitle={item?.title}
              desc={item?.description}
              isActive={item?.isActive}
              category={item?.category?.title}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(CourseBoard);
