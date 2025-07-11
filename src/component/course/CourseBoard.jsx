import { memo } from "react";

import { Grid } from "@mui/material";
import styles from "@/style/page.module.css";
import Card from "../card/Card";

const CourseBoard = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data &&
        data.map((item) => (
          <Grid key={item?.id} size={4} className={styles.cardMainBox}>
            <Card
              image={`http://localhost:8000/${item?.coverImage}`}
              cartText={item?.description}
              subTitle={item?.title}
              desc={item?.description}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(CourseBoard);
