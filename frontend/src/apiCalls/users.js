import { message } from "antd";
import axiosInstance from "./axiosinstance";



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
    console.log(error.message, 'failed')
    return error.message;
  }
};



// update user profile
export const UpdateUserProfile = async (userId, payload) => {
  try {
    const response = await axiosInstance.put(`/api/auth/update/${userId}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
