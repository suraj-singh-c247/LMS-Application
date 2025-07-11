"use client";

import { useEffect, useState } from "react";

import PageLayout from "@/component/common/PageLayout";

import styles from "@/style/page.module.css";
import { courseServices } from "@/service/apiCourse";
import AddEditModal from "@/component/common/button/modal/AddEditModal";
import CourseBoard from "@/component/course/CourseBoard";
import AddCourseForm from "@/component/course/AddCourseForm";
import CustomPagination from "@/component/common/pagination/CustomPagination";

export default function CoursePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [addOpen, setAddOpen] = useState({ id: null, open: false });
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
  console.log(data, "data");

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
    <PageLayout
      title={"Courses"}
      btnText={"Add Course"}
      addOpen={addOpen}
      setAddOpen={setAddOpen}
    >
      <CourseBoard data={data?.courses} />
      <CustomPagination
        count={data?.total}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowChange={handleRowPerPageChange}
      />
      <AddEditModal
        open={addOpen.open}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Course" : "Add Course"}
      >
        <AddCourseForm
          id={addOpen?.id}
          getCourseData={handleGetData}
          onClose={() => {
            setAddOpen({ id: null, open: false });
          }}
        />
      </AddEditModal>
    </PageLayout>
  );
}
