"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getToken, panelRole } from "@/service/api-helpers";

export const AuthGuard = ({ children }) => {
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  const token = getToken();
  const role = panelRole();

  const authCheck = useCallback(() => {
    if (!token && !role) {
      router.replace("/login");
      return;
    } else {
      if (role === 1) {
        router.replace("/admin/dashboard");
      }
      if (role === 2) {
        router.replace("/dashboard");
      }
    }
    setChecked(true);
  }, [token, role, router]);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (!checked) {
    return null;
  }
  return <>{children}</>;
};
