"use client";
const Base_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== undefined) {
    const token = localStorage.getItem("accessToken");
    return token ? JSON.parse(token) : null;
  }
  return null;
};

const setToken = (token) => {
  if (typeof window !== undefined) {
    return localStorage.setItem("accessToken", JSON.stringify(token));
  }
  return null;
};

const removeToken = () => {
  if (typeof window !== undefined) {
    return localStorage.clear();
  }
  return null;
};

const panelRole = () => {
  if (typeof window !== undefined) {
    const role = localStorage.getItem("role");
    return role ? JSON.parse(role) : null;
  }
  return null;
};

export { Base_URL, getToken, setToken, removeToken, panelRole };
