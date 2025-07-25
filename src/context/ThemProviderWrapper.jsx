"use client";

import { ThemeProvider } from "./ThemeContext";

export default function ThemeProviderWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
