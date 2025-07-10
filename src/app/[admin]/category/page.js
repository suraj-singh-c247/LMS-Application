"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/component/common/PageLayout";
import CustomTable from "@/component/common/table/CustomTable";
import { categoryColumns } from "@/utilis/column";
import { categoryServices } from "@/service/admin/apiCategory";
import { toast } from "react-toastify";
import AddEditModal from "@/component/common/button/modal/AddEditModal";
import AddEditCategory from "@/component/category/AddEditCategory";

function AdminCategory() {
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  const [addOpen, setAddOpen] = useState({ id: null, open: false });

  useEffect(() => {
    handleGetData(page, rowPerPage);
  }, [page, rowPerPage]);

  const handleGetData = (page, rowPerPage) => {
    categoryServices
      .getAllCategory(page, rowPerPage)
      .then((response) => {
        if (response?.status === 200) {
          const { data, message } = response?.data;
          setCategoryData(data);
          toast.success(message);
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
    console.log(newPage, "newPage");
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
        title={"Category"}
        btnText={"Add Categories"}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      >
        <CustomTable
          loader={loader}
          page={page}
          rowsPerPage={rowPerPage}
          count={categoryData.total}
          categoryData={categoryData.categories ?? []}
          onPageChange={handlePageChange}
          onRowChange={handleRowPerPageChange}
          columns={categoryColumns}
          setAddOpen={setAddOpen}
        />
      </PageLayout>
      {/* This modal for add user */}
      <AddEditModal
        open={addOpen.open}
        categoryData={categoryData.categories ?? []}
        setCategoryData={setCategoryData}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Categories" : "Add Categories"}
        getDataTable={handleGetData}
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
    </>
  );
}

export default AdminCategory;
