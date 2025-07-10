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

const ViewModal = ({ open, onClose, title, children }) => {
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
            <Typography
              className={styles.modalHeading}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => {
                onClose();
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
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

export default memo(ViewModal);
