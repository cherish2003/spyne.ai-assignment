import axios from "axios";

axios.defaults.withCredentials = true;
export const loginApi = axios.create({
  baseURL: "http://localhost:3000/api/auth/signin",
});
export const registerApi = axios.create({
  baseURL: "http://localhost:3000/api/auth/register",
});
export const tokenApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user/refresh`,
});
export const getUserdata = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user/getdata`,
});
export const validateToken = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user/verifyId`,
});
