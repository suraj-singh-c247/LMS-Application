"use client";

import { useEffect, useState } from "react";

import CourseBoard from "@/component/CourseBoard";
import PageLayout from "@/component/PageLayout";

import styles from "@/style/page.module.css";
import { guestServices } from "@/service/dashboard/apiDashboard";

export default function CoursePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    guestServices
      .getAllCourse()
      .then((response) => {
        console.log(response, "response data");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  });
  return (
    <main className={styles.main}>
      <PageLayout title={"Courses"}>
        <CourseBoard />
      </PageLayout>
    </main>
  );
}
