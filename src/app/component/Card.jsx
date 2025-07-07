import { memo } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Button from "./common/button/Button";
import styles from "@/app/style/page.module.css"
const CustomCard = () => {
  return (
    <Card component={"a"} href="#" className={styles.cardBox}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
              className={styles.cardMedia}
      />
          <CardContent className={styles.cardContent}>
          <Typography gutterBottom variant="h6" component="div" className={styles.cardSubTitle}>
          Lizard
        </Typography>
        <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
          Lizard
        </Typography>
        <Typography variant="body2" className={styles.cardDescription}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};
export default memo(CustomCard);
