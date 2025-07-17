"use client";

import DashBoard from "@/component/adminDashboard/DashBoard";
import styles from "@/style/page.module.css";

export default function AdminDashboard() {
  return (
    <main className={styles.main}>
      <DashBoard />
    </main>
  );
}
