import { formattedDate } from "@/utilis/date";
import ActionCell from "../common/actioncell/ActionCell";
import Button from "../common/button/Button";
import { Chip, List, ListItem, Typography } from "@mui/material";

import styles from "@/style/table.module.css";

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

    { name: "visibility", label: "Visibility", options: { sort: false } },
    {
      name: "category",
      label: "Category",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value?.title || "N/A";
        },
      },
    },
    { name: "slug", label: "Slug", options: { sort: false } },
    // {
    //   name: "tags",
    //   label: "Tags",
    //   options: {
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const rowData = tableData[tableMeta.rowIndex]?.tags;
    //       return (
    //         (
    //           <List sx={{ display: "inline-flex", flexWrap: "wrap" }}>
    //             {rowData &&
    //               rowData?.map((item) => (
    //                 <ListItem key={item?.id} sx={{ flexBasis: "50%" }}>
    //                   <Chip label={item?.title} />
    //                 </ListItem>
    //               ))}
    //           </List>
    //         ) || "N/A"
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "learningOutcomes",
    //   label: "Learning Outcomes",
    //   options: {
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const rowData = tableData[tableMeta.rowIndex]?.learningOutcomes;
    //       return (
    //         (
    //           <List sx={{ display: "inline-flex", flexWrap: "wrap" }}>
    //             {rowData &&
    //               rowData?.map((item, index) => (
    //                 <ListItem key={index + 1} sx={{ flexBasis: "50%" }}>
    //                   <Chip label={item} />
    //                 </ListItem>
    //               ))}
    //           </List>
    //         ) || "N/A"
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "prerequisites",
    //   label: "Prerequisites",
    //   options: {
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const rowData = tableData[tableMeta.rowIndex]?.prerequisites;
    //       return (
    //         (
    //           <List sx={{ display: "inline-flex", flexWrap: "wrap" }}>
    //             {rowData &&
    //               rowData?.map((item) => (
    //                 <ListItem key={item?.id} sx={{ flexBasis: "50%" }}>
    //                   <Chip label={item?.title} />
    //                 </ListItem>
    //               ))}
    //           </List>
    //         ) || "N/A"
    //       );
    //     },
    //   },
    // },
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
              label={rowData.isActive ? "Active" : "Inactive"}
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
        setCellHeaderProps: () => ({
          style: { width: "180px" },
        }),
        setCellProps: () => ({
          style: { width: "180px" },
        }),
      },
    },
  ];
}

export { columns };
