import { formattedDate } from "@/utilis/date";
import ActionCell from "../common/actioncell/ActionCell";
import Button from "../common/button/Button";
import { Typography } from "@mui/material";

import styles from "@/style/table.module.css";

export function getChapterTableColumns({
  setAddOpen,
  setViewOpen,
  setDeleteModal,
  setStatusModal,
  tableData,
  courseId,
} = {}) {
  // handle modal toggle
  const handleView = (row) =>
    setViewOpen({ id: row.id, open: true, data: row });
  const handleOpen = (row) => setAddOpen({ id: row.id, open: true });
  const handleDelete = (row) => setDeleteModal({ id: row.id, open: true });

  return [
    { name: "title", label: "Title", options: { sort: true, filter: false } },
    {
      name: "description",
      label: "Description",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableData[tableMeta.rowIndex];
          return (
            <Typography
              variant="span"
              className={`${styles.dateText} ${styles.description}`}
            >
              {rowData?.description}
            </Typography>
          );
        },
      },
    },
    {
      name: "courseTitle",
      label: "Course",
      options: {
        sort: false,
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableData[tableMeta.rowIndex]?.course;
          return (
            <Typography variant="span" className={styles.dateText}>
              {rowData?.title}
            </Typography>
          );
        },
        filterType: "dropdown",
        filterOptions: {
          names: courseId.map((item) => item?.title),
        },
      },
    },
    {
      name: "createdAt",
      label: "Date",
      options: {
        sort: true,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableData[tableMeta.rowIndex];
          return (
            <Typography variant="span" className={styles.dateText}>
              {formattedDate(rowData?.createdAt)}
            </Typography>
          );
        },
      },
    },
    {
      name: "sortOrder",
      label: "Sort Order",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "isActive",
      label: "Active",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableData[tableMeta.rowIndex];
          return (
            <Button
              onClick={() => {
                setStatusModal({ id: rowData.id, open: true, data: rowData });
              }}
              variant={rowData.isActive ? "active" : "InActive"}
              label={rowData.isActive ? "Active" : "InActive"}
              sx={{ backgroundColor: `${rowData.isActive ? "green" : ""}` }}
            />
          );
        },
      },
    },
    {
      name: "action",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableData[tableMeta.rowIndex];
          return (
            <ActionCell
              row={rowData}
              onView={handleView}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          );
        },
      },
    },
  ];
}

export { columns };
