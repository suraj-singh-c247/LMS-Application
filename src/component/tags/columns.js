import ActionCell from "../common/actioncell/ActionCell";
import Button from "../common/button/Button";

export function getTagTableColumns({
  setAddOpen,
  setViewOpen,
  setDeleteModal,
  setStatusModal,
  tableData,
  setSingleData,
} = {}) {
  // handle modal toggle
  const handleView = (row) => setViewOpen({ id: row.id, open: true });
  const handleOpen = (row) => setAddOpen({ id: row.id, open: true });
  const handleDelete = (row) => setDeleteModal({ id: row.id, open: true });

  return [
    { name: "name", label: "Name", options: { sort: true } },
    { name: "isDeleted", label: "Delete", options: { sort: false } },
    { name: "deletedAt", label: "DeletedAt", options: { sort: false } },
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
          setSingleData(rowData);
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
