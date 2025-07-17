import axios from "axios";
import { Base_URL, getToken } from "./api-helpers";

const token = getToken();

export const categoryServices = {
  getAllCategory,
  createCategory,
  updateCategory,
  updateStatusCategory,
  deleteCategory,
};

async function getAllCategory(page, rowPerPage, searchText, sortOrder) {
  return await axios.get(
    `${Base_URL}/category?page=${page + 1}&limit=${rowPerPage}&search=${
      searchText ? searchText : ""
    }&sortBy=${sortOrder?.name ? sortOrder?.name : "createdAt"}&orderBy=${
      sortOrder?.direction ? sortOrder?.direction : "desc"
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
async function createCategory(data) {
  return await axios.post(`${Base_URL}/category`, data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function updateCategory(id, data) {
  const updateData = { name: data };
  return await axios.put(`${Base_URL}/category/${id}`, updateData, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function updateStatusCategory(id, data) {
  const isActive = { isActive: data };
  return await axios.put(`${Base_URL}/category/change-status/${id}`, isActive, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function deleteCategory(id) {
  return await axios.delete(`${Base_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
