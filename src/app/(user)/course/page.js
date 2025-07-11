"use client";

import { useEffect, useState } from "react";

import CourseBoard from "@/component/CourseBoard";
import PageLayout from "@/component/common/PageLayout";

import styles from "@/style/page.module.css";

import { courseServices } from "@/service/apiCourse";
import CustomPagination from "@/component/common/pagination/CustomPagination";

export default function CoursePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    handleGetData();
  }, [page, rowPerPage]);

  const handleGetData = (page, rowPerPage) => {
    courseServices
      .getAllCourse(page, rowPerPage)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          console.log(data, "data");
          setData(data);
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
    <main className={styles.main}>
      <PageLayout title={"Courses"}>
        <CourseBoard data={data?.courses} />{" "}
        <CustomPagination
          count={data?.total}
          page={page}
          rowsPerPage={rowPerPage}
          onPageChange={handlePageChange}
          onRowChange={handleRowPerPageChange}
        />
      </PageLayout>
    </main>
  );
}
