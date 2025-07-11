import axios from "axios";
import { Base_URL, getToken } from "./api-helpers";

const token = getToken();

export const courseServices = {
  getAllCourse,
  createCourse,
  updateCourse,
  //   updateStatusCategory,
  //   deleteCategory,
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
  return await axios.post(`${Base_URL}/course`, data, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function updateCourse(data) {
  return await axios.post(`${Base_URL}/course`, data, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}
