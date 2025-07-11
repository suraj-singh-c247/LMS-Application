import { memo, useEffect, useState } from "react";
import Card from "../card/Card";
import { Box } from "@mui/material";
import style from "@/style/page.module.css";
const ViewCourse = ({ id, data }) => {
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    const findSingle = data?.find((item) => item?.id === id);
    setSingleData(findSingle);
  }, []);

  return (
    <Box className={style.cardMainBox}>
      {" "}
      <Card
        image={`http://localhost:8000/${singleData?.coverImage}`}
        cartText={singleData?.description}
        subTitle={singleData?.title}
        desc={singleData?.description}
        category={singleData?.category?.title}
        isActive={singleData?.isActive}
      />
    </Box>
  );
};

export default memo(ViewCourse);
