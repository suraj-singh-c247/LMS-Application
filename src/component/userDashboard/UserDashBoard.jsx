import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import styles from "@/style/page.module.css";
import Button from "../common/button/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { categoryServices } from "@/service/category";
import { toast } from "react-toastify";
import { courseServices } from "@/service/course";
import CourseList from "./CourseList";
import Image from "next/image";

import CollegeDekhoImage from "@/images/collegeDekho.png";
import InfsImage from "@/images/infs.png";
import GrawHillImage from "@/images/grawHill.png";
import IskonImage from "@/images/iskcon.png";
import AdityaBirlaImage from "@/images/adityaBirla.png";
import LearnBayImage from "@/images/learnBay.png";
import LawSikhoImage from "@/images/lawsikho.png";
import Footer from "../common/footer/Footer";
import { footerRoutes } from "@/utilis/routes";

const UserDashBoard = () => {
  const [value, setValue] = useState("1");
  const [tabList, setTabList] = useState([]);
  const [course, setCourse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sorting, setSorting] = useState({
    name: "createdAt",
    direction: "desc",
  });
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // handleGetCategory();
    handleGetCourse();
  }, [page, rowPerPage, value, searchText, sorting]);

  // const handleGetCategory = () => {
  //   categoryServices
  //     .getAllCategory(page, rowPerPage, searchText, sorting)
  //     .then((response) => {
  //       console.log(response, "response");

  //       if (response?.status === 200) {
  //         const { data } = response?.data;
  //         setTabList(data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error, "error");

  //       if (error.response) {
  //         toast.error(error.response.data?.message);
  //         return;
  //       } else if (error.request) {
  //         toast.error(error.request);
  //         return;
  //       }
  //     });
  // };

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
        setLoader(false);
        throw error;
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
        <Grid
          container
          spacing={1}
          flexDirection={"column"}
          className={styles.mainContentBox}
        >
          <Grid size={12}>
            <Typography component={"h6"} className={styles.subHeading}>
              Online Course
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography component={"h1"} className={styles.mainHeading}>
              "Sharpen Your Skills With Professional Online Courses"
            </Typography>
            <Typography component={"p"} className={styles.mainPara}>
              Deliver training programs, convert insights into profit, and build
              lasting learner loyalty—all under your brand.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Button
              type="button"
              variant={"info"}
              label={"Join Now"}
              endIcon={<ArrowOutwardIcon />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.heroBottomBox}>
        <Box>
          <Typography
            variant="strong"
            className={`${styles.textHeading} ${styles.primaryColor}`}
          >
            5000+ training businesses
          </Typography>
          <Typography
            variant="strong"
            className={`${styles.textHeading} ${styles.secondaryColor}`}
          >
            serving more than 5.5M students
          </Typography>
          <Typography
            variant="strong"
            className={`${styles.textHeading} ${styles.primaryColor}`}
          >
            across 160+ countries
          </Typography>
        </Box>
        <Box className={styles.imageBox}>
          <Image
            src={CollegeDekhoImage}
            width={140}
            height={70}
            alt="CollegeDekhoImage"
          />
          <Image src={InfsImage} width={50} height={57} alt="InfsImage" />
          <Image
            src={GrawHillImage}
            width={60}
            height={60}
            alt="GrawHillImage"
          />
          <Image src={IskonImage} width={60} height={60} alt="IskonImage" />
          <Image
            src={AdityaBirlaImage}
            width={100}
            height={79}
            alt="AdityaBirlaImage"
          />
          <Image
            src={LearnBayImage}
            width={130}
            height={25}
            alt="LearnBayImage"
          />
          <Image
            src={LawSikhoImage}
            width={130}
            height={32}
            alt="LawSikhoImage"
          />
        </Box>
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
      <Footer footerRoutes={footerRoutes} />
    </>
  );
};

export default memo(UserDashBoard);
