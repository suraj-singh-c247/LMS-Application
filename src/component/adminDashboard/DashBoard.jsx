import { Avatar, Box, Grid, Typography } from "@mui/material";
import { memo } from "react";
import styles from "@/style/page.module.css";
import Button from "../common/button/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { panelRole } from "@/service/api-helpers";
import Card from "../card/Card";

// images
import ChatGptImage from "@/images/chatGPTCourse.jpg";
import JavaScriptImage from "@/images/JavaScript_Course.jpg";
import backendDevelopment from "@/images/backend_development.jpg";
const categoryList = [
  {
    id: 1,
    image: ChatGptImage,
    cartText: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
    subTitle: "AI",
  },
  {
    id: 2,
    image: JavaScriptImage,
    cartText: "Modern JavaScript From The Beginning 2.0 (2024)",
    subTitle: "Web Development",
  },
  {
    id: 3,
    image: backendDevelopment,
    cartText: "Fundamentals of Backend Engineering",
    subTitle: "Web Development",
  },
];
const DashBoard = () => {
  const role = panelRole();
  return (
    <>
      {role === 1 ? (
        <Grid container spacing={2} mb={3}>
          {categoryList.map((item) => {
            return (
              <Grid key={item?.id} size={4} className={styles.cardMainBox}>
                <Card
                  image={item?.image.src}
                  cartText={item?.cartText}
                  subTitle={item?.subTitle}
                  isActive={false}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
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
      )}
    </>
  );
};

export default memo(DashBoard);
