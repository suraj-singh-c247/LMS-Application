"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/component/common/PageLayout";
import { categoryServices } from "@/service/category";
import AddEditCategory from "@/component/category/AddEditCategory";
import DeleteCategory from "@/component/category/DeleteCategory";
import Modal from "@/component/common/modal/Modal";
import MuiDataTable from "@/component/common/table/MuiDataTable";
import { getCategoryTableColumns } from "@/component/category/columns";
import { getTableOptions } from "@/utilis/options";
import CategoryStatus from "@/component/category/CategoryStatus";
import ViewData from "@/component/common/viewData/ViewData";

function AdminCategory() {
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
    categoryServices
      .getAllCategory(page, rowsPerPage, searchText, sortOrder)
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

  const columns = getCategoryTableColumns({
    setAddOpen: setAddOpen,
    setViewOpen: setViewOpen,
    setDeleteModal: setDeleteModal,
    setStatusModal: setStatusModal,
    tableData: data?.categories ?? [],
  });

  return (
    <>
      <PageLayout
        title={"Categories"}
        btnText={"Add Category"}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      >
        <MuiDataTable
          data={data?.categories ?? []}
          columns={columns}
          options={options}
        />
      </PageLayout>
      {/* This modal for add user */}
      <Modal
        open={addOpen?.open}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Category" : "Add Category"}
      >
        <AddEditCategory
          id={addOpen?.id}
          getDataTable={handleGetData}
          onClose={() => {
            setAddOpen({ id: null, open: false });
          }}
        />
      </Modal>
      <Modal
        open={viewOpen?.open}
        title={"View Category"}
        onClose={() => {
          setViewOpen({ id: null, open: false });
        }}
      >
        <ViewData id={viewOpen?.id} singleData={viewOpen?.data} />
      </Modal>
      <Modal
        title={"Delete Category"}
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({ id: null, open: false });
        }}
      >
        <DeleteCategory
          id={deleteModal?.id}
          text={"Are you sure you want to delete this category?"}
          handleGetData={handleGetData}
          onClose={() => {
            setDeleteModal({ id: null, open: false });
          }}
        />
      </Modal>
      <Modal
        title={"Change Category Status"}
        open={statusModal.open}
        onClose={() => {
          setStatusModal({ id: null, open: false });
        }}
      >
        <CategoryStatus
          id={statusModal?.id}
          text={"Are you sure you want to change this category status?"}
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

export default AdminCategory;
