"use client";

import { useContext } from "react";

import { ThemeContext, ThemeProvider } from "./ThemeContext";

export default function ThemeProviderWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return <ThemeProvider>{children}</ThemeProvider>;
}
