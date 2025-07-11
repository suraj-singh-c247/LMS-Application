"use client";

import { useEffect, useState } from "react";

import PageLayout from "@/component/common/PageLayout";

import styles from "@/style/page.module.css";
import { courseServices } from "@/service/apiCourse";
import AddEditModal from "@/component/common/button/modal/AddEditModal";
import CourseBoard from "@/component/course/CourseBoard";
import AddCourseForm from "@/component/course/AddCourseForm";
import CustomPagination from "@/component/common/pagination/CustomPagination";
import CustomTable from "@/component/common/table/CustomTable";
import AdminCourseTable from "@/component/course/AdminCourseTable";
import { courseColumns } from "@/utilis/column";
import ViewModal from "@/component/common/button/modal/ViewModal";
import ViewCourse from "@/component/course/ViewCourse";
import DeleteModal from "@/component/common/button/modal/DeleteModal";
import DeleteCourse from "@/component/course/DeleteCourse";

export default function CoursePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [addOpen, setAddOpen] = useState({ id: null, open: false });
  const [viewOpen, setViewOpen] = useState({ id: null, open: false });
  const [deleteModal, setDeleteModal] = useState({ id: null, open: false });
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    handleGetData();
  }, [page, rowPerPage]);

  const handleGetData = () => {
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
    <PageLayout
      title={"Courses"}
      btnText={"Add Course"}
      addOpen={addOpen}
      setAddOpen={setAddOpen}
    >
      <AdminCourseTable
        loader={loader}
        page={page}
        rowsPerPage={rowPerPage}
        count={data?.total}
        data={data?.courses ?? []}
        onPageChange={handlePageChange}
        onRowChange={handleRowPerPageChange}
        columns={courseColumns}
        setAddOpen={setAddOpen}
        setViewModal={setViewOpen}
        setDeleteModal={setDeleteModal}
        getDataTable={handleGetData}
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
          data={data?.courses ?? []}
          getCourseData={handleGetData}
          onClose={() => {
            setAddOpen({ id: null, open: false });
          }}
        />
      </AddEditModal>
      <ViewModal
        open={viewOpen?.open}
        title={"View Course"}
        onClose={() => {
          setViewOpen({ id: null, open: false });
        }}
      >
        <ViewCourse id={viewOpen?.id} data={data?.courses} />
      </ViewModal>
      <DeleteModal
        title={"Delete Course"}
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({ id: null, open: false });
        }}
      >
        <DeleteCourse
          id={deleteModal?.id}
          text={"Are you sure you want to delete this course?"}
          handleGetData={handleGetData}
          onClose={() => {
            setDeleteModal({ id: null, open: false });
          }}
        />
      </DeleteModal>
    </PageLayout>
  );
}
