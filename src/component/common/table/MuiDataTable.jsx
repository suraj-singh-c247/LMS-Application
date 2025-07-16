import React, { memo } from "react";

import MUIDataTable from "mui-datatables";

import styles from "@/style/table.module.css";
import { Box } from "@mui/material";

const MuiDataTable = ({ title, data, columns, options }) => {
  return (
    <Box className={styles.muiDataTable}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default memo(MuiDataTable);
