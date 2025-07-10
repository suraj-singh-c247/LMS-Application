import { memo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import styles from "@/style/page.module.css";

const CustomCard = ({ image, cartText, subTitle, desc }) => {
  return (
    <Card component={"a"} href="#" className={styles.cardBox}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${image}`}
        title="green iguana"
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className={styles.cardSubTitle}
        >
          {subTitle}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={styles.cardTitle}
        >
          {cartText}
        </Typography>
        <Typography variant="body2" className={styles.cardDescription}>
          {desc ? desc : null}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default memo(CustomCard);
