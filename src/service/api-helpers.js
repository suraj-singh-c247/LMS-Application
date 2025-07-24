"use client";

import axios from "axios";

const Base_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = window?.localStorage?.getItem("accessToken");
    return token ? JSON.parse(token) : null;
  }
  return null;
};

const setToken = (token) => {
  if (typeof window !== "undefined") {
    return window?.localStorage?.setItem("accessToken", JSON.stringify(token));
  }
  return null;
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    return window?.localStorage?.clear();
  }
  return null;
};

const panelRole = () => {
  if (typeof window !== "undefined") {
    const role = window?.localStorage?.getItem("role");
    return role ? JSON.parse(role) : null;
  }
  return null;
};

const token = getToken();

const getApi = async (url, config = {}) => {
  return await axios.get(url, {
    ...config,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const postApi = async (url, data, config = {}) => {
  return await axios.post(url, data, {
    ...config,
    method: "POST",
    headers: {
      "Content-Type": `${
        config?.headers?.ContentType === "multipart/form-data"
          ? config?.headers?.ContentType
          : "application/json"
      }`,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const putApi = async (url, data, config = {}) => {  
  return await axios.put(url, data, {
    ...config,
    method: "PUT",
    headers: {
      "Content-Type": `${
        config?.headers?.ContentType === "multipart/form-data"
          ? config?.headers?.ContentType
          : "application/json"
      }`,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteApi = async (url, config = {}) => {
  return await axios.delete(url, {
    ...config,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  Base_URL,
  getToken,
  setToken,
  removeToken,
  panelRole,
  getApi,
  postApi,
  putApi,
  deleteApi,
};
