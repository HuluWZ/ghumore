import axiosInstance, { AxiosInstance } from "./axiosinstance";

// Define a function to fetch all categories
export const fetchAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/category/get/");

    // The response data will contain totalCategory, category, and success properties
    // const { totalCategory, category, success } = response.data;

    // You can do whatever you need with the data here.
    // For example, you could return the categories array.
    // console.log(category);
    return response.data;
  } catch (error) {
    // If there was an error, you can handle it here
    console.error("Error fetching categories:", error);
    return error.message
  }
};
