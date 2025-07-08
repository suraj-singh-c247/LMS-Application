import axios from "axios";
import { Base_URL } from "../api-helpers";

export const authServices = {
  login,
  register,
};

// login API
async function login(data) {
  return await axios.post(`${Base_URL}/auth/login`, data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// register API
async function register(data) {
  return await axios.post(`${Base_URL}/auth/register`, data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
