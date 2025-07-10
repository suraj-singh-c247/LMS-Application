import axios from "axios";
import { Base_URL, getToken } from "../../api-helpers";

const token = getToken();

export const guestServices = {
  getAllCourse,
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
