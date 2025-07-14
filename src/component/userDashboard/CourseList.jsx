import React from "react";
import PageLayout from "../common/PageLayout";
import CourseBoard from "../course/CourseBoard";
import CustomPagination from "../common/pagination/CustomPagination";
import { Typography } from "@mui/material";
import Loader from "../common/Loader/Loader";

const CourseList = ({
  page,
  rowPerPage,
  course = [],
  onPageChange,
  onRowChange,
  loader,
}) => {
  return (
    <PageLayout title={"Courses"}>
      {loader && <Loader />}
      <CourseBoard course={course?.courses} />
      {course?.length === 0 && (
        <Typography
          component={"p"}
          fontSize={"16px"}
          fontWeight={"600"}
          textAlign={"center"}
        >
          No Course Available...
        </Typography>
      )}
      <CustomPagination
        count={course?.total}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={onPageChange}
        onRowChange={onRowChange}
      />
    </PageLayout>
  );
};

export default CourseList;
