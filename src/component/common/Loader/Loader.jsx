import { memo } from "react";
import styles from "./loader.module.css";
import { Box } from "@mui/material";
const Loader = () => {
  return <Box className={styles.loader}></Box>;
};

export default memo(Loader);
