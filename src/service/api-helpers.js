"use client";

import axios from "axios";
import { toast } from "react-toastify";

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
    return window?.localStorage?.removeItem("accessToken");
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

const getApi = async (url, config = {}) => {
  const token = getToken();
  try {
    const response = await axios.get(url, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message || "Something went wrong!");
    } else if (error.request) {
      toast.error("Network error or no response from server");
    } else {
      toast.error(error.message);
    }
    throw error;
  }
};

const postApi = async (url, data, config = {}) => {
  const token = getToken();
  try {
    const response = await axios.post(url, data, {
      ...config,
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
    return response;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message || "Something went wrong!");
    } else if (error.request) {
      toast.error("Network error or no response from server");
    } else {
      toast.error(error.message);
    }
    throw error;
  }
};

const putApi = async (url, data, config = {}) => {
  const token = getToken();
  try {
    const response = await axios.put(url, data, {
      ...config,
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
    return response;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message || "Something went wrong!");
    } else if (error.request) {
      toast.error("Network error or no response from server");
    } else {
      toast.error(error.message);
    }
    throw error;
  }
};
const deleteApi = async (url, config = {}) => {
  const token = getToken();
  try {
    const response = await axios.delete(url, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message || "Something went wrong!");
    } else if (error.request) {
      toast.error("Network error or no response from server");
    } else {
      toast.error(error.message);
    }
    throw error;
  }
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
