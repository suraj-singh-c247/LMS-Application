import { Fade, IconButton, Tooltip } from "@mui/material";
import React from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const ActionCell = ({ row, onView, onOpen, onDelete }) => {
  return (
    <>
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
        <IconButton onClick={() => onView(row)}>
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
        <IconButton onClick={() => onOpen(row)}>
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
        <IconButton onClick={() => onDelete(row)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ActionCell;
