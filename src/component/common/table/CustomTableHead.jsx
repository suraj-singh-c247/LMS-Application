import { TableCell, TableHead, TableRow } from "@mui/material";

import { memo } from "react";

import tableStyle from "@/style/Table.module.css";

const CustomTableHead = ({ columns }) => {
  return (
    <TableHead className={tableStyle.tableHead}>
      <TableRow className={tableStyle.tableRow}>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || "left"}
            style={{ minWidth: column.minWidth }}
            className={tableStyle.tableHeading}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(CustomTableHead);
