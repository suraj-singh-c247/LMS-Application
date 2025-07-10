"use client";

import { useEffect, useState } from "react";

import PageLayout from "@/component/common/PageLayout";

import styles from "@/style/page.module.css";
import { courseServices } from "@/service/apiCourse";
import AddEditModal from "@/component/common/button/modal/AddEditModal";
import CourseBoard from "@/component/course/CourseBoard";
import AddCourseForm from "@/component/course/AddCourseForm";

export default function CoursePage() {
  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState({ id: null, open: false });
  useEffect(() => {
    courseServices
      .getAllCourse()
      .then((response) => {
        console.log(response, "response data");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  });
  return (
    <PageLayout
      title={"Courses"}
      btnText={"Add Course"}
      addOpen={addOpen}
      setAddOpen={setAddOpen}
    >
      <CourseBoard />
      <AddEditModal
        open={addOpen.open}
        onClose={() => {
          setAddOpen({ id: null, open: false });
        }}
        title={addOpen?.id ? "Edit Course" : "Add Course"}
      >
        <AddCourseForm />
      </AddEditModal>
    </PageLayout>
  );
}
