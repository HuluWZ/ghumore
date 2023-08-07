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

 
export const authenticateWithGoogle = (scope) => {
  axiosInstance.get('/auth/google', {
    params: {
      scope: scope, // Pass the scope parameter received to the GET request
    },
  })
    .then(response => {
      // Redirect or perform any necessary actions after successful authentication
      console.log('Authentication successful');
    })
    .catch(error => {
      // Handle errors during authentication
      console.error('Authentication failed:', error);
    });
};

const API_BASE_URL = "http://your-api-url.com"; // Replace with your API base URL

// Function to send the change password request
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = localStorage.getItem("token"); // Replace with how you store the authentication token

    const response = await axiosInstance.put(
      `/api/auth/change/password/`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Assuming your API returns data with a success message
  } catch (error) {
    // Handle error here
    throw error;
  }
};