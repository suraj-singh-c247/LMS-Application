"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/component/common/PageLayout";
import Modal from "@/component/common/modal/Modal";
import MuiDataTable from "@/component/common/table/MuiDataTable";
import { getTableOptions } from "@/utilis/options";
import ViewData from "@/component/common/viewData/ViewData";
import { getChapterTableColumns } from "@/component/chapter/column";
import { courseServices } from "@/service/course";
import { chapterServices } from "@/service/chapter";
import AddEditChapter from "@/component/chapter/AddEditChapter";
import DeleteChapter from "@/component/chapter/DeleteChapter";
import ChapterStatus from "@/component/chapter/ChapterStatus";

function ChapterPage() {
  const [data, setData] = useState([]);
  const [courseId, setCourseId] = useState([]);
  const [eachCourseId, setEachCourseId] = useState(null);
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
  }, [page, rowsPerPage, searchText, eachCourseId, sortOrder]);

  const handleGetData = () => {
    chapterServices
      .getAllChapter(page, rowsPerPage, searchText, eachCourseId, sortOrder)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setData(data);
          setLoader(false);
        }
      })
      .catch((error) => {
        setLoader(false);
        throw error;
      });
  };

  useEffect(() => {
    handleCourseData();
  }, [page, rowsPerPage]);

  const handleCourseData = () => {
    courseServices
      .getAllCourse(page, rowsPerPage)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setCourseId(data?.courses);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  const options = getTableOptions({
    filter: true,
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

  const columns = getChapterTableColumns({
    setAddOpen: setAddOpen,
    setViewOpen: setViewOpen,
    setDeleteModal: setDeleteModal,
    setStatusModal: setStatusModal,
    tableData: data?.chapters ?? [],
    courseId: courseId,
  });

  return (
    <>
      <PageLayout
        title={"Chapters"}
        btnText={"Add Chapter"}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      >
        <MuiDataTable
          data={data?.chapters ?? []}
          columns={columns}
          options={{
            ...options,
            onFilterChange: (changedColumn, filterList, type) => {
              if (changedColumn === "courseTitle") {
                const columnIndex = columns.findIndex(
                  (c) => c.name === "courseTitle"
                );
                const selectedCourseTitle = filterList[columnIndex]?.[0];
                const selectedCourseId = courseId.find(
                  (item) => item?.title === selectedCourseTitle
                );
                if (selectedCourseId) {
                  setEachCourseId(selectedCourseId?.id);
                }
              }
              if (type === "reset") {
                setEachCourseId(null);
              }
            },
          }}
        />
      </PageLayout>
      {/* This modal for add user */}
      <Modal
        open={addOpen?.open}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Chapter" : "Add Chapter"}
      >
        <AddEditChapter
          id={addOpen?.id}
          getDataTable={handleGetData}
          courseId={courseId}
          onClose={() => {
            setAddOpen({ id: null, open: false });
          }}
        />
      </Modal>
      <Modal
        open={viewOpen?.open}
        title={"View Chapter"}
        onClose={() => {
          setViewOpen({ id: null, open: false });
        }}
      >
        <ViewData id={viewOpen?.id} singleData={viewOpen?.data} />
      </Modal>
      <Modal
        title={"Delete Chapter"}
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({ id: null, open: false });
        }}
      >
        <DeleteChapter
          id={deleteModal?.id}
          text={"Are you sure you want to delete this chapter?"}
          handleGetData={handleGetData}
          onClose={() => {
            setDeleteModal({ id: null, open: false });
          }}
        />
      </Modal>
      <Modal
        title={"Change Chapter Status"}
        open={statusModal.open}
        onClose={() => {
          setStatusModal({ id: null, open: false });
        }}
      >
        <ChapterStatus
          id={statusModal?.id}
          text={"Are you sure you want to change this chapter status?"}
          handleGetData={handleGetData}
          singleData={statusModal?.data}
          onClose={() => {
            setStatusModal({ id: null, open: false });
          }}
        />
      </Modal>
    </>
  );
}

export default ChapterPage;
