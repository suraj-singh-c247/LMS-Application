"use client";

import { useState } from "react";

import Header from "@/component/common/Header";
import SideBar from "@/component/common/SideBar";

import ThemeProviderWrapper from "@/context/ThemProviderWrapper";
import styles from "@/style/page.module.css";
import { AuthGuard } from "@/guard/AuthGuard";

export default function AdminDashBoardLayout({ children }) {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  return (
    <AuthGuard>
      {" "}
      <ThemeProviderWrapper>
        <SideBar sideBarToggle={sideBarToggle} />
        <Header
          setSideBarToggle={setSideBarToggle}
          sideBarToggle={sideBarToggle}
        />
        <section
          className={`${styles.page} ${
            sideBarToggle ? styles.pageExpand : styles.pageCollapse
          }`}
        >
          {children}
        </section>
      </ThemeProviderWrapper>
    </AuthGuard>
  );
}
