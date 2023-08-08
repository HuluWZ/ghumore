import axiosInstance from "./axiosinstance";

export const SearchActivity = async (location = '', name = '', category='') => {
    try {
      const response = await axiosInstance.get(`/api/activity/search?location=${location}&name=${name}&category=${category}`);
      return response.data;
    } catch (error) {
        return error.message;
      }
  };

  export const getAllActivity = async () => {
    try {
      const response = await axiosInstance.get('/api/activity/get/');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
  export const filterActivities = async (queryParams) => {
    try {
      const response = await axiosInstance.get(`/api/activity/filter`, {
        params: queryParams,
      });
  
      console.log(response.data);
      // Handle the response data here, e.g., set it to a state in React or process it further
      return response.data;
    } catch (error) {
      console.error(error);
      // Handle errors here
      throw error;
    }
  }

  export const checkActivityAvailability = async (activityId, quantity, date) => {
    const url = `api/activity/check/`;
    const params = {
      activity: activityId,
      quantity: quantity,
      date: date,
    };
  
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      // Handle error if request fails
      console.error('Error:', error);
      return error.message;
    }
  };


  
  
