import { Base_URL, deleteApi, getApi, postApi, putApi } from "./api-helpers";

const apiURL = Base_URL + "/course";

export const courseServices = {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  updateStatusCourse,
  deleteCourse,
};

async function getAllCourse(page, rowPerPage, searchText, sortOrder) {
  const url = `${apiURL}?page=${page + 1}&limit=${rowPerPage}&search=${
    searchText ? searchText : ""
  }&sortBy=${sortOrder?.name ? sortOrder?.name : "createdAt"}&orderBy=${
    sortOrder?.direction ? sortOrder?.direction : "desc"
  }`;
  return await getApi(url);
}

async function getCourseById(id) {
  const url = `${apiURL}/${id}`;
  return await getApi(url);
}

async function createCourse(data) {
  const url = `${apiURL}`;
  return await postApi(url, data, {
    headers: {
      ContentType: "multipart/form-data",
    },
  });
}
async function updateCourse(id, data) {
  const url = `${apiURL}/${id}`;
  return await putApi(url, data, {
    headers: {
      ContentType: "multipart/form-data",
    },
  });
}

async function updateStatusCourse(id, data) {
  const url = `${apiURL}/change-status/${id}`;
  const isActive = { isActive: data };
  return await putApi(url, isActive);
}

async function deleteCourse(id) {
  const url = `${apiURL}/${id}`;
  return await deleteApi(url);
}
