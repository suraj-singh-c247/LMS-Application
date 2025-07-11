import { Table, TableContainer } from "@mui/material";
import { memo } from "react";
// Components

import tableStyle from "@/style/table.module.css";
import CustomTableHead from "../common/table/CustomTableHead";
import CourseTableBody from "./CourseTableBody";
import CustomPagination from "../common/pagination/CustomPagination";

const AdminCourseTable = ({
  data,
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
  getDataTable,
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
          <CourseTableBody
            loader={loader}
            data={data}
            setViewModal={setViewModal}
            setAddOpen={setAddOpen}
            setDeleteModal={setDeleteModal}
            getDataTable={getDataTable}
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

export default memo(AdminCourseTable);
