import axios from "axios";
import { Base_URL, getToken } from "./api-helpers";

const token = getToken();

export const courseServices = {
  getAllCourse,
  createCourse,
  updateCourse,
  updateStatusCourse,
  deleteCourse,
};

async function getAllCourse(page, rowPerPage) {
  return await axios.get(
    `${Base_URL}/course?page=${page + 1}&limit=${rowPerPage}`,
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

async function createCourse(data) {
  console.log(data, "createcourse");

  return await axios.post(`${Base_URL}/course`, data, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function updateCourse(id, data) {
  console.log(id, data, "data api");

  return await axios.post(`${Base_URL}/course/${id}`, data, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function updateStatusCourse(id, data) {
  const isActive = { isActive: data };
  return await axios.put(`${Base_URL}/course/change-status/${id}`, isActive, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

async function deleteCourse(id) {
  return await axios.delete(`${Base_URL}/course/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
