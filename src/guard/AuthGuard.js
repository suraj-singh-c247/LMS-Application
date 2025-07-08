"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getToken } from "@/service/api-helpers";

export const AuthGuard = ({ children }) => {
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  const token = getToken();
  
  useEffect(() => {
    authCheck();
  }, [checked]);

  const authCheck = useCallback(() => {
    if (!token) {
      router.replace("/signin");
    } else {
      setChecked(true);
    }
  }, [token]);

  if (!checked) {
    return null;
  }
  return <>{children}</>;
};
