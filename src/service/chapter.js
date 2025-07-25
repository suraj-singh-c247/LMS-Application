import { Base_URL, deleteApi, getApi, postApi, putApi } from "./api-helpers";

const apiURL = Base_URL + "/chapter";

export const chapterServices = {
  getAllChapter,
  getChapterById,
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
  const url = `${apiURL}?page=${page + 1}&limit=${rowPerPage}&search=${
    searchText ? searchText : ""
  }&courseId=${courseId ? courseId : ""}&sortBy=${
    sortOrder?.name ? sortOrder?.name : "createdAt"
  }&orderBy=${sortOrder?.direction ? sortOrder?.direction : "desc"}`;
  return await getApi(url);
}

async function getChapterById(id) {
  const url = `${apiURL}/${id}`;
  return await getApi(url);
}

async function createChapter(data) {
  const url = `${apiURL}`;
  return await postApi(url, data);
}

async function updateChapter(id, data) {
  const url = `${apiURL}/${id}`;
  return await putApi(url, data);
}

async function updateStatusChapter(id, data) {
  const url = `${apiURL}/change-status/${id}`;
  const isActive = { isActive: data };
  return await putApi(url, isActive);
}

async function deleteChapter(id) {
  const url = `${apiURL}/${id}`;
  return await deleteApi(url);
}
