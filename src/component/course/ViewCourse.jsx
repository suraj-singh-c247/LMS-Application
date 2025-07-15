import { memo, useEffect, useState } from "react";
import Card from "../card/Card";
import { Box } from "@mui/material";
import style from "@/style/page.module.css";
const ViewCourse = ({ id, singleData }) => {
  return (
    <Box className={style.cardMainBox}>
      {" "}
      <Card
        image={`http://localhost:8000/${singleData?.coverImage}`}
        id={id}
        visibility={singleData?.visibility ?? ""}
        title={singleData?.title}
        desc={singleData?.description}
        category={singleData?.category?.title}
        isActive={singleData?.isActive}
      />
    </Box>
  );
};

export default memo(ViewCourse);
