"use client";

import Header from "@/component/common/Header";

import ThemeProviderWrapper from "@/context/ThemProviderWrapper";
import styles from "@/style/page.module.css";
import { AuthGuard } from "@/guard/AuthGuard";

export default function UserDashBoardLayout({ children }) {
  return (
    <AuthGuard>
      {" "}
      <ThemeProviderWrapper>
        <Header />
        <main className={styles.userMain}>{children}</main>
      </ThemeProviderWrapper>
    </AuthGuard>
  );
}
