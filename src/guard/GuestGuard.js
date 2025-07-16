"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getToken, panelRole } from "@/service/api-helpers";

export const GuestGuard = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const token = getToken();
  const role = panelRole();

  useEffect(() => {
    authCheck();
  }, [checked]);

  const authCheck = useCallback(() => {
    if (token && role) {
      if (role === 1) {
        router.replace("/admin/dashboard");
      }
      if (role === 2) {
        router.replace("/dashboard");
      }
    } else {
      setChecked(true);
    }
  }, [token, role]);

  if (!checked) {
    return null;
  }
  return <>{children}</>;
};
