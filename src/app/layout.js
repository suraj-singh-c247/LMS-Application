"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "@/style/page.module.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${styles.mainBody}`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
