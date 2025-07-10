import axios from "axios";
import { Base_URL, getToken } from "./api-helpers";

const token = getToken();

export const courseServices = {
  getAllCourse,
  createCourse,
  //   updateCategory,
  //   updateStatusCategory,
  //   deleteCategory,
};

async function getAllCourse() {
  return await axios.get(`${Base_URL}/course?page=${10}&limit=${5}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
async function createCourse(data) {
  return await axios.post(`${Base_URL}/course`, data, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}
