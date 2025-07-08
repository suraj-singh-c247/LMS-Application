import { Avatar, Box, Grid, Typography } from "@mui/material";
import { memo } from "react";
import styles from "@/style/page.module.css";
import Button from "./common/button/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { panelRole } from "@/service/api-helpers";

const DashBoard = () => {
  const role = panelRole();
  return (
    <>
      <Box component={"section"} className={styles.dashBoardSection}>
        <Grid container spacing={1} flexDirection={"column"}>
          <Grid size={12}>
            <Typography component={"h6"} className={styles.subHeading}>
              Online Course
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography component={"h1"} className={styles.mainHeading}>
              {`${
                role === 1
                  ? "Welcome To Admin"
                  : "Sharpen Your Skills With Professional Online Courses"
              }`}
            </Typography>
          </Grid>
          <Grid size={12}>
            {role === 1 ? (
              <Button
                type="button"
                variant={"primary"}
                label={"Let's See"}
                endIcon={<ArrowOutwardIcon />}
              />
            ) : (
              <Button
                type="button"
                variant={"primary"}
                label={"Join Now"}
                endIcon={<ArrowOutwardIcon />}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <Box component={"article"} className={styles.productBox}>
        <Grid container spacing={1}>
          <Grid size={4}>
            <Box className={styles.productDesign}>
              <Avatar className={styles.productAvatar}>
                <NotificationsNoneOutlinedIcon className={styles.icon} />
              </Avatar>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography component={"span"} fontSize={"12px"}>
                  2/8 Watched
                </Typography>
                <Typography
                  component={"strong"}
                  fontWeight={"bold"}
                  fontSize={"12px"}
                >
                  Product Design
                </Typography>
              </Box>
              <MoreVertOutlinedIcon />
            </Box>
          </Grid>
          <Grid size={4}>
            <Box className={styles.productDesign}>
              <Avatar className={styles.productAvatar}>
                <NotificationsNoneOutlinedIcon className={styles.icon} />
              </Avatar>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography component={"span"} fontSize={"12px"}>
                  2/8 Watched
                </Typography>
                <Typography
                  component={"strong"}
                  fontWeight={"bold"}
                  fontSize={"12px"}
                >
                  Product Design
                </Typography>
              </Box>
              <MoreVertOutlinedIcon />
            </Box>
          </Grid>
          <Grid size={4}>
            <Box className={styles.productDesign}>
              <Avatar className={styles.productAvatar}>
                <NotificationsNoneOutlinedIcon className={styles.icon} />
              </Avatar>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography component={"span"} fontSize={"12px"}>
                  2/8 Watched
                </Typography>
                <Typography
                  component={"strong"}
                  fontWeight={"bold"}
                  fontSize={"12px"}
                >
                  Product Design
                </Typography>
              </Box>
              <MoreVertOutlinedIcon />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default memo(DashBoard);
