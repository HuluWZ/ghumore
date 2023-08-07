import axiosInstance, { AxiosInstance } from "./axiosinstance";

// Define a function to fetch all categories
export const fetchAllLocations = async () => {
  try {
    const response = await axiosInstance.get("/api/location/get/");

    return response.data;
  } catch (error) {
    // If there was an error, you can handle it here
    console.error("Error fetching location:", error);
    return error.message
  }
};
