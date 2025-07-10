import axios from "axios";
import { Base_URL, getToken } from "../api-helpers";

const token = getToken();

export const categoryServices = {
  getAllCategory,
  category,
  updateCategory,
};

async function getAllCategory(page, rowPerPage) {
  return await axios.get(
    `${Base_URL}/category?page=${page + 1}&limit=${rowPerPage}`,
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
async function category(data) {
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
  return await axios.put(`${Base_URL}/category/${id}`, data, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
