"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/component/common/PageLayout";
import CustomTable from "@/component/common/table/CustomTable";
import { categoryColumns } from "@/utilis/column";
import { categoryServices } from "@/service/apiCategory";
import { toast } from "react-toastify";
import AddEditCategory from "@/component/category/AddEditCategory";
import AddEditModal from "@/component/common/button/modal/AddEditModal";
import ViewModal from "@/component/common/button/modal/ViewModal";
import ViewCategory from "@/component/category/ViewCategory";
import DeleteModal from "@/component/common/button/modal/DeleteModal";
import DeleteCategory from "@/component/category/DeleteCategory";

function AdminCategory() {
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  const [addOpen, setAddOpen] = useState({ id: null, open: false });
  const [viewOpen, setViewOpen] = useState({ id: null, open: false });
  const [deleteModal, setDeleteModal] = useState({ id: null, open: false });

  useEffect(() => {
    handleGetData();
  }, [page, rowPerPage]);

  const handleGetData = () => {
    categoryServices
      .getAllCategory(page, rowPerPage)
      .then((response) => {
        if (response?.status === 200) {
          const { data } = response?.data;
          setCategoryData(data);
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
    <>
      <PageLayout
        title={"Categories"}
        btnText={"Add Category"}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      >
        <CustomTable
          loader={loader}
          page={page}
          rowsPerPage={rowPerPage}
          count={categoryData.total}
          data={categoryData.categories ?? []}
          onPageChange={handlePageChange}
          onRowChange={handleRowPerPageChange}
          columns={categoryColumns}
          setAddOpen={setAddOpen}
          setViewModal={setViewOpen}
          setDeleteModal={setDeleteModal}
          getDataTable={handleGetData}
        />
      </PageLayout>
      {/* This modal for add user */}
      <AddEditModal
        open={addOpen.open}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Category" : "Add Category"}
      >
        <AddEditCategory
          id={addOpen.id}
          categoryData={categoryData.categories ?? []}
          getDataTable={handleGetData}
          onClose={() => {
            setAddOpen({ id: null, open: false });
          }}
        />
      </AddEditModal>
      <ViewModal
        open={viewOpen?.open}
        title={"View Category"}
        onClose={() => {
          setViewOpen({ id: null, open: false });
        }}
      >
        <ViewCategory
          id={viewOpen?.id}
          categoryData={categoryData.categories ?? []}
        />
      </ViewModal>
      <DeleteModal
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
      </DeleteModal>
    </>
  );
}

export default AdminCategory;
