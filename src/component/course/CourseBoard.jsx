import { memo } from "react";

import { Grid } from "@mui/material";
import styles from "@/style/page.module.css";
import Card from "../card/Card";

const CourseBoard = ({ data }) => {
  console.log(data, "data coursebord");

  return (
    <Grid container spacing={2}>
      {data &&
        data.map((item) => (
          <Grid key={item?.id} size={4} className={styles.cardMainBox}>
            <Card
              image={item?.coverImage}
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
