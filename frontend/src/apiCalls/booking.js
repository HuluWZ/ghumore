import axiosInstance from "./axiosinstance";

// Create Booking
export const createBooking = async (bookingData,token) => {
  try {
    const response = await axiosInstance.post(
      `/api/booking/create`,
      bookingData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update Booking
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await axiosInstance.put(
      `/api/booking/update/${id}`,
      bookingData
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get Booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/booking/get/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get All Bookings
export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get(`/api/booking/get`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Delete Booking
export const deleteBooking = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/booking/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Cancel Booking
export const cancelBooking = async (id, token) => {
  try {
    const response = await axiosInstance.put(`/api/booking/cancel/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Confirm Booking
export const confirmBooking = async (id) => {
  try {
    const response = await axiosInstance.put(`/api/booking/confirm/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Pay with Stripe for Booking
export const payWithStripeBooking = async (id) => {
  try {
    const response = await axiosInstance.put(`/api/booking/pay/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// const authenticateWithGoogle = async () => {
//   try {
//     const response = await axiosInstance.get('/api/auth/google');
//     // No specific response handling
//   } catch (error) {
//     // Handle error if needed
//   }
// };

// Function to authenticate with Facebook
const authenticateWithFacebook = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/facebook");
    // No specific response handling
  } catch (error) {
    // Handle error if needed
  }
};

export const getMyBookings = async (token) => {
  try {
    const response = await axiosInstance.get(`/api/booking/get/my/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyCartBookings = async (token) => {
  try {
    const response = await axiosInstance.get(`/api/booking/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
