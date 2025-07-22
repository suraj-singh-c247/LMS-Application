import axios from "axios";
import { Base_URL, getToken } from "./api-helpers";

const token = getToken();

export const chapterServices = {
  getAllChapter,
  getEachChapter,
  createChapter,
  updateChapter,
  updateStatusChapter,
  deleteChapter,
};

async function getAllChapter(
  page,
  rowPerPage,
  searchText,
  courseId,
  sortOrder
) {
  return await axios.get(
    `${Base_URL}/chapter?page=${page + 1}&limit=${rowPerPage}&search=${
      searchText ? searchText : ""
    }&courseId=${courseId ? courseId : ""}&sortBy=${
      sortOrder?.name ? sortOrder?.name : "createdAt"
    }&orderBy=${sortOrder?.direction ? sortOrder?.direction : "desc"}`,
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

async function getEachChapter(id) {
  return await axios.get(`${Base_URL}/chapter/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function createChapter(data) {
  return await axios.post(`${Base_URL}/chapter`, data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function updateChapter(id, data) {
  return await axios.put(`${Base_URL}/chapter/${id}`, data, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function updateStatusChapter(id, data) {
  const isActive = { isActive: data };
  return await axios.put(`${Base_URL}/chapter/change-status/${id}`, isActive, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function deleteChapter(id) {
  return await axios.delete(`${Base_URL}/chapter/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
