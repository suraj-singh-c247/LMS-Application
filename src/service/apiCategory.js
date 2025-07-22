import axios from "axios";
import {
  Base_URL,
  deleteApi,
  getApi,
  getToken,
  postApi,
  putApi,
} from "./api-helpers";

const token = getToken();

const apiURL = Base_URL + "/category";

export const categoryServices = {
  getAllCategory,
  getEachCategory,
  createCategory,
  updateCategory,
  updateStatusCategory,
  deleteCategory,
};

async function getAllCategory(page, rowPerPage, searchText, sortOrder) {
  const url = `${apiURL}?page=${page + 1}&limit=${rowPerPage}&search=${
    searchText ? searchText : ""
  }&sortBy=${sortOrder?.name ? sortOrder?.name : "createdAt"}&orderBy=${
    sortOrder?.direction ? sortOrder?.direction : "desc"
  }`;
  return await getApi(url);
}

async function getEachCategory(id) {
  const url = `${apiURL}/${id}`;
  return await getApi(url);
}

async function createCategory(data) {
  const url = `${apiURL}`;
  return await postApi(url, data);
}

async function updateCategory(id, data) {
  const url = `${apiURL}/${id}`;
  return await putApi(url, data);
}

async function updateStatusCategory(id, data) {
  const url = `${apiURL}/change-status/${id}`;
  const isActive = { isActive: data };
  return await putApi(url, isActive);
}

async function deleteCategory(id) {
  const url = `${apiURL}/${id}`;
  return await deleteApi(url);
}
