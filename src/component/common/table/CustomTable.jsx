import { Table, TableContainer } from "@mui/material";
import { memo } from "react";
// Components
import CustomTableHead from "./CustomTableHead";
import CustomTableBody from "./CustomTableBody";
import CustomPagination from "../pagination/CustomPagination";

import tableStyle from "./Table.module.css";

const CustomTable = ({
  categoryData,
  page,
  loader,
  rowsPerPage,
  count,
  columns,
  onPageChange,
  onRowChange,
  setViewModal,
  setAddOpen,
  setDeleteModal,
}) => {
  return (
    <>
      <TableContainer>
        <Table
          stickyHeader
          aria-label="sticky table"
          className={tableStyle.table}
        >
          <CustomTableHead columns={columns} />
          <CustomTableBody
            loader={loader}
            categoryData={categoryData}
            setViewModal={setViewModal}
            setAddOpen={setAddOpen}
            setDeleteModal={setDeleteModal}
          />
        </Table>
      </TableContainer>
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowChange={onRowChange}
      />
    </>
  );
};

export default memo(CustomTable);
