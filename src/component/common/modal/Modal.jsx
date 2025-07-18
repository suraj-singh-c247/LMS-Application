import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { memo } from "react";
import styles from "@/style/modal.module.css";

import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DomainVerificationOutlinedIcon from "@mui/icons-material/DomainVerificationOutlined";

const CustomModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box className={styles.modalStyle}>
          <Box className={styles.modalHeader}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box className={styles.modalHeadingIcon}>
                {title.includes("Add") ? (
                  <CreateNewFolderOutlinedIcon />
                ) : title.includes("Edit") ? (
                  <DriveFileRenameOutlineOutlinedIcon />
                ) : title?.includes("View") ? (
                  <PreviewOutlinedIcon />
                ) : title?.includes("Delete") ? (
                  <DeleteOutlineOutlinedIcon />
                ) : (
                  <DomainVerificationOutlinedIcon />
                )}
              </Box>
              <Typography
                className={styles.modalHeading}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {title}
              </Typography>
            </Box>

            <IconButton
              aria-label="close"
              onClick={() => {
                onClose();
              }}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.modalContent}>{children}</Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(CustomModal);
