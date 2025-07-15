import ActionCell from "../common/actioncell/ActionCell";
import Button from "../common/button/Button";

export function getCourseTableColumns({
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
    { name: "title", label: "Title", options: { sort: true } },
    { name: "description", label: "Description", options: { sort: false } },

    { name: "visibility", label: "Visibility", options: { sort: false } },
    {
      name: "category title",
      label: "Category Title",
      options: { sort: false },
    },
    { name: "slug", label: "Slug", options: { sort: false } },
    { name: "tags", label: "Tags", options: { sort: false } },
    {
      name: "learningOutcomes",
      label: "Learning Outcomes",
      options: { sort: false },
    },
    { name: "prerequisites", label: "Prerequisites", options: { sort: false } },
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
