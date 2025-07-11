import { Box, Chip, Grid, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import style from "@/style/page.module.css";

import PersonIcon from "@mui/icons-material/Person";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const ViewCategory = ({ id, categoryData }) => {
  const [singleCategary, setSingleCategary] = useState(null);
  useEffect(() => {
    if (categoryData) {
      const findCategory = categoryData.find((item) => item?.id === id);
      setSingleCategary(findCategory);
    }
  }, []);
  return (
    <Grid container spacing={1} className={style.viewDetails}>
      <Grid size={12}>
        <Box className={style.viewDetailsBox}>
          <PersonIcon color="success" />
          <Box>
            <Typography
              variant="subtitle2"
              component="strong"
              className={style.viewDetailsLabel}
            >
              Name:{" "}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              className={style.viewContent}
            >
              {singleCategary?.name}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box className={style.viewDetailsBox}>
          <PanoramaFishEyeIcon color="success" />
          <Box>
            <Typography
              variant="subtitle2"
              component="strong"
              className={style.viewDetailsLabel}
            >
              Active:{" "}
            </Typography>
            {singleCategary?.isActive.toString() && (
              <Chip
                color={
                  singleCategary?.isActive.toString() === "true"
                    ? "success"
                    : singleCategary?.isActive.toString() === "false"
                    ? "warning"
                    : "info"
                }
                label={
                  singleCategary?.isActive.toString() === "true"
                    ? "true"
                    : singleCategary?.isActive.toString() === "false"
                    ? "false"
                    : null
                }
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(ViewCategory);
