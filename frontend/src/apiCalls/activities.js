import axiosInstance from "./axiosinstance";

export const SearchActivity = async (location = '', name = '') => {
    try {
      const response = await axiosInstance.get(`/api/activity/search?location=${location}&name=${name}`);
      return response.data;
    } catch (error) {
        return error.message;
      }
  };