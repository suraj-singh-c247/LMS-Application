"use client";

import { useState } from "react";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import ThemeProviderWrapper from "../context/ThemProviderWrapper";
import styles from "@/app/style/page.module.css";

export default function DashBoardLayout({ children }) {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  return (
    <ThemeProviderWrapper>
      <SideBar sideBarToggle={sideBarToggle} />
      <Header
        // searchTerm={searchText}
        // setSearchTerm={setSearchText}
        // handleSearch={handleSearch}
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
  );
}
