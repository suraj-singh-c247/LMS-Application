"use client";
import { getToken, panelRole } from "@/service/api-helpers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = getToken();
  const role = panelRole();
  console.log(
    token,
    "middleware access",
    role,
    "middleware role",
    request,
    "request"
  );

  const { pathname } = request.nextUrl;
  console.log(pathname, "pathname");
  // admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!token && role !== 1) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // user routes protection
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role === 1) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }
  // login routes protection
  if (pathname === "login") {
    if (role === 1) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (role === 2) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/login"],
};
