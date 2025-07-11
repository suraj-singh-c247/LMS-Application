import {
  FormControlLabel,
  Switch,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { memo } from "react";

import tableStyle from "@/style/table.module.css";

import { toast } from "react-toastify";
import Loader from "../common/Loader/Loader";
import ActionCell from "../common/actioncell/ActionCell";
import { courseServices } from "@/service/apiCourse";

const CourseTableBody = ({
  data,
  setViewModal,
  setAddOpen,
  setDeleteModal,
  loader,
  getDataTable,
}) => {
  // handle modal toggle
  const handleView = (row) => setViewModal({ id: row.id, open: true });
  const handleOpen = (row) => setAddOpen({ id: row.id, open: true });
  const handleDelete = (row) => setDeleteModal({ id: row.id, open: true });
  const handleStatusChange = (e, id) => {
    const active = e.target.checked;
    courseServices
      .updateStatusCourse(id, active)
      .then((response) => {
        if (response?.status === 200) {
          const { message } = response?.data;
          getDataTable();
          toast.success(message);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          toast.error(error.response.data?.message);
          return;
        } else if (error.request) {
          toast.error(error.request);
          return;
        }
      });
  };
  return (
    <TableBody className={tableStyle.tableBody}>
      {loader && (
        <TableRow>
          <TableCell style={{ textAlign: "center" }} colSpan={"6"}>
            <Loader />
          </TableCell>
        </TableRow>
      )}
      {data &&
        data.map((row) => (
          <TableRow hover key={row.id}>
            <TableCell>{row?.title}</TableCell>
            <TableCell>{row?.description}</TableCell>
            <TableCell>
              <FormControlLabel
                control={
                  <Switch
                    checked={row?.isActive}
                    onChange={(e) => handleStatusChange(e, row.id)}
                  />
                }
              />
            </TableCell>
            <TableCell>{row?.visibility}</TableCell>
            <TableCell>{row?.category?.title}</TableCell>
            <TableCell>{row?.slug}</TableCell>
            <TableCell>{row?.tags}</TableCell>
            <TableCell>{row?.learningOutcomes}</TableCell>
            <TableCell>{row?.prerequisites}</TableCell>
            <TableCell style={{ display: "flex", gap: "4px" }}>
              <ActionCell
                row={row}
                onView={handleView}
                onOpen={handleOpen}
                onDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      {data?.length === 0 && !loader && (
        <TableRow>
          <TableCell style={{ textAlign: "center" }} colSpan={"6"}>
            No data found...
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default memo(CourseTableBody);
