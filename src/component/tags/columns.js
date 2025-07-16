import { Typography } from "@mui/material";
import ActionCell from "../common/actioncell/ActionCell";
import Button from "../common/button/Button";
import { formattedDate } from "@/utilis/date";

import styles from "@/style/table.module.css";

export function getTagTableColumns({
  setAddOpen,
  setViewOpen,
  setDeleteModal,
  setStatusModal,
  tableData,
} = {}) {
  // handle modal toggle
  const handleView = (row) =>
    setViewOpen({ id: row?.id, open: true, data: row });
  const handleOpen = (row) => setAddOpen({ id: row?.id, open: true });
  const handleDelete = (row) => setDeleteModal({ id: row?.id, open: true });

  return [
    { name: "name", label: "Name", options: { sort: true } },
    {
      name: "createdAt",
      label: "CreatedAt",
      options: {
        sort: false,
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
                setStatusModal({ id: rowData?.id, open: true, data: rowData });
              }}
              variant={rowData?.isActive ? "active" : "InActive"}
              label={rowData?.isActive ? "Active" : "InActive"}
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
