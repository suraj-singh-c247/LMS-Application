import { Box, Chip, Grid, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import style from "@/style/page.module.css";

import PersonIcon from "@mui/icons-material/Person";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const ViewCategory = ({ id, singleData }) => {
  const isActive = singleData?.isActive;

  const chipColor =
    isActive === true ? "success" : isActive === false ? "warning" : "info";

  const chipLabel =
    isActive === true ? "true" : isActive === false ? "false" : "unknown";

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
              {singleData?.name}
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
            {typeof isActive !== "undefined" && (
              <Chip color={chipColor} label={chipLabel} />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(ViewCategory);
