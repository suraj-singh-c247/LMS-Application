import { Base_URL, deleteApi, getApi, postApi, putApi } from "./api-helpers";

const apiURL = Base_URL + "/tag";

export const tagsServices = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  updateStatusTag,
  deleteTag,
};

async function getAllTags(page, rowPerPage, searchText, sortOrder) {
  const url = `${apiURL}?page=${page + 1}&limit=${rowPerPage}&search=${
    searchText ? searchText : ""
  }&sortBy=${sortOrder?.name ? sortOrder?.name : "createdAt"}&orderBy=${
    sortOrder?.direction ? sortOrder?.direction : "desc"
  }`;
  return await getApi(url);
}

async function getTagById(id) {
  const url = `${apiURL}/${id}`;
  return await getApi(url);
}

async function createTag(data) {
  const url = `${apiURL}`;
  return await postApi(url, data);
}
async function updateTag(id, data) {
  const url = `${apiURL}/${id}`;
  return await putApi(url, data);
}

async function updateStatusTag(id, data) {
  const url = `${apiURL}/change-status/${id}`;
  const isActive = { isActive: data };
  return await putApi(url, isActive);
}

async function deleteTag(id) {
  const url = `${apiURL}/${id}`;
  return await deleteApi(url);
}
