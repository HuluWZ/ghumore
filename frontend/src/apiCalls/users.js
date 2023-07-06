import { message } from "antd";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// register user
export const RegisterUser = async (payload) => {
  try {
    console.log("before");
    const response = await axiosInstance.post("/api/auth/create/", payload);
    console.log(response, "response");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/auth/login/", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get current user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/currentuser/");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
