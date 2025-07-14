import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import styles from "@/style/page.module.css";
import Button from "../common/button/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import Card from "../card/Card";
import { categoryServices } from "@/service/apiCategory";
import { toast } from "react-toastify";
import { courseServices } from "@/service/apiCourse";
import CourseList from "./CourseList";

const UserDashBoard = () => {
  const [value, setValue] = useState("1");
  const [tabList, setTabList] = useState([]);
  const [course, setCourse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    handleGetCategory();
    handleGetCourse();
  }, [page, rowPerPage]);

  const handleGetCategory = () => {
    categoryServices
      .getAllCategory(page, rowPerPage)
      .then((response) => {
        console.log(response, "response");

        if (response?.status === 200) {
          const { data } = response?.data;
          setTabList(data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          toast.error(error.response.data?.message);
          return;
        } else if (error.request) {
          toast.error(error.request);
          return;
        }
      });
  };

  const handleGetCourse = () => {
    courseServices
      .getAllCourse(page, rowPerPage)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setCourse(data);
          setLoader(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          toast.error(error.response.data?.message);
          return;
        } else if (error.request) {
          toast.error(error.request);
          return;
        }
        setLoader(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Function to handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowPerPageChange = (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowPerPage);
    setPage(page);
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
      <Box
        display={"flex"}
        flexDirection={"column"}
        className={styles.courseMainBox}
      >
        <Typography component={"h3"} className={styles.courseMainHeading}>
          All the skills you need in one place
        </Typography>
        <Typography component={"p"} className={styles.courseMainPara}>
          From critical skills to technical topics, Udemy supports your
          professional development.
        </Typography>
      </Box>
      <Box
        className={styles.courseTabBox}
        sx={{ width: "100%", typography: "body1" }}
      >
        <Box
          className={styles.courseTabSubBox}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
            className={styles.courseTab}
          >
            {/* {tabList &&
              tabList.map((item) => (
                <Tab label={item?.name} value={item?.id} />
              ))} */}
            <Tab
              label={"All Courses"}
              value={"1"}
              className={styles.courseTabValue}
            />
            <Tab
              label={"Other Courses"}
              value={"2"}
              className={styles.courseTabValue}
            />{" "}
          </Tabs>
        </Box>
        {value === "1" && (
          <CourseList
            page={page}
            rowPerPage={rowPerPage}
            course={course ?? []}
            onPageChange={handlePageChange}
            onRowChange={handleRowPerPageChange}
            loader={loader}
          />
        )}
        {value === "2" && "Others"}
      </Box>
    </>
  );
};

export default memo(UserDashBoard);
