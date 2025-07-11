"use client";
import styles from "@/style/page.module.css";
import UserDashBoard from "@/component/userDashboard/UserDashBoard";

export default function DashBoardPage() {
  return (
    <main className={styles.main}>
      <UserDashBoard />
    </main>
  );
}
