"use client";

import DashBoard from "@/component/adminDashboard/DashBoard";
import styles from "@/style/page.module.css";

export default function AdminDashboard(params) {
  return (
    <main className={styles.main}>
      <DashBoard />
    </main>
  );
}
