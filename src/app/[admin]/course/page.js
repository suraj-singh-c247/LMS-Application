"use client";

import { useEffect, useState } from "react";

import PageLayout from "@/component/common/PageLayout";
import { courseServices } from "@/service/apiCourse";
import AddCourseForm from "@/component/course/AddCourseForm";
import ViewCourse from "@/component/course/ViewCourse";
import DeleteCourse from "@/component/course/DeleteCourse";
import { getCourseTableColumns } from "@/component/course/columns";
import { getTableOptions } from "@/utilis/options";

import Modal from "@/component/common/modal/Modal";
import CourseStatus from "@/component/course/CourseStatus";

import MuiDataTable from "@/component/common/table/MuiDataTable";

export default function CoursePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState({});
  const [addOpen, setAddOpen] = useState({
    id: null,
    open: false,
  });
  const [viewOpen, setViewOpen] = useState({
    id: null,
    open: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    id: null,
    open: false,
  });
  const [statusModal, setStatusModal] = useState({
    id: null,
    open: false,
    data: null,
  });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    handleGetData();
  }, [page, rowsPerPage, searchText, sortOrder]);

  const handleGetData = () => {
    courseServices
      .getAllCourse(page, rowsPerPage, searchText, sortOrder)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setData(data);
          setLoader(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data?.message);
          return;
        } else if (error.request) {
          toast.error(error.request);
          return;
        }
        setLoader(false);
      });
  };

  const options = getTableOptions({
    filter: false,
    count: data?.total,
    page: page,
    rowsPerPage: rowsPerPage,
    search: true,
    searchText: searchText,
    setSearchText: setSearchText,
    setPage: setPage,
    setRowsPerPage: setRowsPerPage,
    setSortOrder: setSortOrder,
  });

  const columns = getCourseTableColumns({
    setAddOpen: setAddOpen,
    setViewOpen: setViewOpen,
    setDeleteModal: setDeleteModal,
    setStatusModal: setStatusModal,
    tableData: data?.courses ?? [],
  });

  return (
    <PageLayout
      title={"Courses"}
      btnText={"Add Course"}
      addOpen={addOpen}
      setAddOpen={setAddOpen}
    >
      <MuiDataTable
        data={data?.courses ?? []}
        columns={columns}
        options={options}
      />

      <Modal
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
      </Modal>
      <Modal
        open={viewOpen?.open}
        title={"View Course"}
        onClose={() => {
          setViewOpen({ id: null, open: false, data: [] });
        }}
      >
        <ViewCourse id={viewOpen?.id} singleData={viewOpen?.data} />
      </Modal>
      <Modal
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
      </Modal>
      <Modal
        title={"Change Course Status"}
        open={statusModal.open}
        onClose={() => {
          setStatusModal({ id: null, open: false });
        }}
      >
        <CourseStatus
          id={statusModal?.id}
          text={"Are you sure you want to change this course status?"}
          handleGetData={handleGetData}
          singleData={statusModal?.data}
          onClose={() => {
            setStatusModal({ id: null, open: false });
          }}
        />
      </Modal>
    </PageLayout>
  );
}
