import { memo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

import styles from "@/style/page.module.css";

const CustomCard = ({
  id,
  category,
  image,
  visibility,
  title,
  desc,
  isActive,
}) => {
  return (
    <Card component={"a"} href="#" className={styles.cardBox}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={image.split("course-images/").pop()}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Box className={styles.titleBox}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className={styles.cardSubTitle}
          >
            {visibility}
          </Typography>
          {id && (
            <Box sx={{ marginBottom: 1 }}>
              {" "}
              <Typography
                variant="subtitle2"
                component="strong"
                sx={{ fontWeight: "600" }}
                className={styles.statusTitle}
              >
                Status:{" "}
              </Typography>
              <Chip
                color={isActive ? "success" : "warning"}
                label={isActive ? "Active" : "InActive"}
              />
            </Box>
          )}
          {id && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography
                component="strong"
                variant="body2"
                sx={{ fontWeight: "600" }}
                className={styles.categoryTitle}
              >
                Category:
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: "500" }}
                className={styles.categoryTitle}
              >
                {category}
              </Typography>
            </Box>
          )}
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={styles.cardTitle}
        >
          {title}
        </Typography>
        <Typography variant="body2" className={styles.cardDescription}>
          {desc ? desc : null}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default memo(CustomCard);
