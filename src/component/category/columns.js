import { formattedDate } from "@/utilis/date";
import ActionCell from "../common/actioncell/ActionCell";
import Button from "../common/button/Button";
import { Typography } from "@mui/material";

import styles from "@/style/table.module.css";

export function getCategoryTableColumns({
  setAddOpen,
  setViewOpen,
  setDeleteModal,
  setStatusModal,
  tableData,
} = {}) {
  // handle modal toggle
  const handleView = (row) =>
    setViewOpen({ id: row.id, open: true, data: row });
  const handleOpen = (row) => setAddOpen({ id: row.id, open: true });
  const handleDelete = (row) => setDeleteModal({ id: row.id, open: true });

  return [
    { name: "name", label: "Name", options: { sort: true } },
    {
      name: "description",
      label: "Description",
      options: {
        sort: false,
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
      name: "createdAt",
      label: "Date",
      options: {
        sort: true,
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
      name: "isActive",
      label: "Active",
      options: {
        sort: false,
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
