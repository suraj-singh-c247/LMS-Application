"use client";

import { GuestGuard } from "@/guard/GuestGuard";

export default function AuthLayout({ children }) {
  return (
    <GuestGuard>
      <main>{children}</main>
    </GuestGuard>
  );
}
