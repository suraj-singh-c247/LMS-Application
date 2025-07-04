"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./component/SideBar";
import Header from "./component/Header";
import styles from "@/app/style/page.module.css";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (text) => {
    searchText(text);
  };


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.mainBody}`}
      >
        <SideBar sideBarToggle={sideBarToggle} />
        <Header
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          handleSearch={handleSearch}
          setSideBarToggle={setSideBarToggle}
          sideBarToggle={sideBarToggle}
        />
        <div className={`${styles.page} ${sideBarToggle?styles.pageExpand:styles.pageCollapse}`}>{children}</div>
      </body>
    </html>
  );
}
