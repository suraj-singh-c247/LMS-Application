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
  category,
  image,
  cartText,
  subTitle,
  desc,
  isActive,
}) => {
  return (
    <Card component={"a"} href="#" className={styles.cardBox}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
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
            {subTitle}
          </Typography>
          <Box sx={{ marginBottom: 1 }}>
            <Typography
              variant="subtitle2"
              component="strong"
              sx={{ fontWeight: "600" }}
            >
              Status:{" "}
            </Typography>

            <Chip
              color={isActive ? "success" : "warning"}
              label={isActive === "Active" ? "Active" : "InActive"}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography
              component="strong"
              variant="body2"
              sx={{ fontWeight: "600" }}
            >
              Category:
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{ fontWeight: "500" }}
            >
              {category}
            </Typography>
          </Box>
        </Box>
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
