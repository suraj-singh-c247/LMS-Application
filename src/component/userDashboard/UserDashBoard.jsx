import { Avatar, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { memo, useState } from "react";
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
const UserDashBoard = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
              "Sharpen Your Skills With Professional Online Courses"
            </Typography>
          </Grid>
          <Grid size={12}>
            <Button
              type="button"
              variant={"primary"}
              label={"Join Now"}
              endIcon={<ArrowOutwardIcon />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default memo(UserDashBoard);
