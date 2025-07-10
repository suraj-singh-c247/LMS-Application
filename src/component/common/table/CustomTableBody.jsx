import {
  Chip,
  Fade,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { memo } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import tableStyle from "./Table.module.css";
import Loader from "../Loader/Loader";

const CustomTableBody = ({
  categoryData,
  setViewModal,
  setAddOpen,
  setDeleteModal,
  loader,
}) => {
  return (
    <TableBody className={tableStyle.tableBody}>
      {loader && (
        <TableRow>
          <TableCell style={{ textAlign: "center" }} colSpan={"6"}>
            <Loader />
          </TableCell>
        </TableRow>
      )}
      {categoryData &&
        categoryData.map((row) => (
          <TableRow hover key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row?.isActive.toString()}</TableCell>
            <TableCell>{row.isDeleted}</TableCell>
            <TableCell>{row.deletedAt}</TableCell>
            <TableCell style={{ display: "flex", gap: "4px" }}>
              <Tooltip
                title="View"
                arrow
                placement="top"
                slots={{
                  transition: Fade,
                }}
                slotProps={{
                  transition: { timeout: 600 },
                }}
              >
                <IconButton
                  onClick={() => setViewModal({ id: row.id, open: true })}
                >
                  <PreviewIcon color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Edit"
                arrow
                placement="top"
                slots={{
                  transition: Fade,
                }}
                slotProps={{
                  transition: { timeout: 600 },
                }}
              >
                <IconButton
                  onClick={() => setAddOpen({ id: row.id, open: true })}
                >
                  <EditIcon color="info" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Delete"
                arrow
                placement="top"
                slots={{
                  transition: Fade,
                }}
                slotProps={{
                  transition: { timeout: 600 },
                }}
              >
                <IconButton
                  onClick={() => setDeleteModal({ id: row.id, open: true })}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      {categoryData.length === 0 && !loader && (
        <TableRow>
          <TableCell style={{ textAlign: "center" }} colSpan={"6"}>
            No data found...
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default memo(CustomTableBody);
