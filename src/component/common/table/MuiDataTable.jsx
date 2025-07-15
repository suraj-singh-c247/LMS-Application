import MUIDataTable from "mui-datatables";
import React, { memo } from "react";

const MuiDataTable = ({ title, data, columns, options }) => {
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default memo(MuiDataTable);
