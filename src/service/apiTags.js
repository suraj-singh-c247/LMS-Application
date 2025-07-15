import axios from "axios";
import { Base_URL, getToken } from "./api-helpers";

const token = getToken();

export const tagsServices = {
  getAllTags,
  createTag,
  updateTag,
  updateStatusTag,
  deleteTag,
};

async function getAllTags(page, rowPerPage, searchText, sortOrder) {
  return await axios.get(
    `${Base_URL}/tag?page=${page + 1}&limit=${rowPerPage}&search=${
      searchText ? searchText : ""
    }&sortBy=${sortOrder?.name ? sortOrder?.name : "title"}$orderBy=${
      sortOrder?.direction ? sortOrder?.direction : "asc"
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
async function createTag(data) {
  return await axios.post(`${Base_URL}/tag`, data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function updateTag(id, data) {
  const updateData = { name: data };
  return await axios.put(`${Base_URL}/tag/${id}`, updateData, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function updateStatusTag(id, data) {
  const isActive = { isActive: data };
  return await axios.put(`${Base_URL}/tag/change-status/${id}`, isActive, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function deleteTag(id) {
  return await axios.delete(`${Base_URL}/tag/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
