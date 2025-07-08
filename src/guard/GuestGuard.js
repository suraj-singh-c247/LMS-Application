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
  }, []);

  const authCheck = useCallback(() => {
    if (token) {
      if (role === 1) {
        router.replace("admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setChecked(true);
    }
  }, [token]);

  if (!checked) {
    return null;
  }
  return <>{children}</>;
};
