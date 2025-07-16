"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/component/common/PageLayout";
import Modal from "@/component/common/modal/Modal";
import MuiDataTable from "@/component/common/table/MuiDataTable";
import { getTableOptions } from "@/utilis/options";
import { getTagTableColumns } from "@/component/tags/columns";
import { tagsServices } from "@/service/apiTags";
import AddEditTag from "@/component/tags/AddEditTag";
import ViewData from "@/component/common/viewData/ViewData";
import DeleteTag from "@/component/tags/DeleteTag";
import TagStatus from "@/component/tags/TagStatus";
import { toast } from "react-toastify";

function Tags() {
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
    tagsServices
      .getAllTags(page, rowsPerPage, searchText, sortOrder)
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

  const columns = getTagTableColumns({
    setAddOpen: setAddOpen,
    setViewOpen: setViewOpen,
    setDeleteModal: setDeleteModal,
    setStatusModal: setStatusModal,
    tableData: data?.tags ?? [],
  });

  return (
    <>
      <PageLayout
        title={"Tags"}
        btnText={"Add Tag"}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      >
        <MuiDataTable
          title={"Tags List"}
          data={data?.tags ?? []}
          columns={columns}
          options={options}
        />
      </PageLayout>

      {/* This modal for add user */}
      <Modal
        open={addOpen.open}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Tag" : "Add Tag"}
      >
        <AddEditTag
          id={addOpen?.id}
          tagData={data?.tags ?? []}
          getDataTable={handleGetData}
          onClose={() => {
            setAddOpen({ id: null, open: false });
          }}
        />
      </Modal>
      <Modal
        open={viewOpen?.open}
        title={"View Tag"}
        onClose={() => {
          setViewOpen({ id: null, open: false });
        }}
      >
        <ViewData id={viewOpen?.id} singleData={viewOpen?.data} />
      </Modal>
      <Modal
        title={"Delete Tag"}
        open={deleteModal.open}
        onClose={() => {
          setDeleteModal({ id: null, open: false });
        }}
      >
        <DeleteTag
          id={deleteModal?.id}
          text={"Are you sure you want to delete this tag?"}
          handleGetData={handleGetData}
          onClose={() => {
            setDeleteModal({ id: null, open: false });
          }}
        />
      </Modal>
      <Modal
        title={"Change Tag Status"}
        open={statusModal.open}
        onClose={() => {
          setStatusModal({ id: null, open: false });
        }}
      >
        <TagStatus
          id={statusModal?.id}
          text={"Are you sure you want to change this tag status?"}
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

export default Tags;
