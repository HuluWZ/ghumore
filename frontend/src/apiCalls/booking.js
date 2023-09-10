import axiosInstance from './axiosinstance'

// Create Booking
export const createBooking = async (bookingData, token) => {
  try {
    const response = await axiosInstance.post(
      `/api/booking/create`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('book created response', response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

//create cart
export const createCart = async (Activity, token) => {
  try {
    const response = await axiosInstance.post(
      `/api/cart/create`,
      { activity: Activity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

//get all cart
export const getAllCart = async token => {
  try {
    const response = await axiosInstance.get(`/api/cart/get/my/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log('activity has to be found in here', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

//delete cart
export const deleteCart = async id => {
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', id)

  try {
    const response = await axiosInstance.delete(`/api/cart/delete/${id}`)
    // console.log(

    //   response
    // )
    // console.log(response.data)
    return response.data
  } catch (error) {
    return error.message
  }
}

// Update Booking
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await axiosInstance.put(
      `/api/booking/update/${id}`,
      bookingData
    )
    return response.data
  } catch (error) {
    return error.message
  }
}

// Get Booking by ID
export const getBookingById = async id => {
  try {
    const response = await axiosInstance.get(`/api/booking/get/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

// Get All Bookings
export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get(`/api/booking/get`)
    return response.data
  } catch (error) {
    return error.message
  }
}

// Delete Booking
export const deleteBooking = async id => {
  try {
    const response = await axiosInstance.delete(`/api/booking/delete/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

export const cancelTheBooking = async (id) => {
  // console.log('the booking id ', id)
  try {
    const response = await axiosInstance.put(`/api/booking/cancel/${id}`)
    console.log(response, 'this is cancel booking')
    return response.data
  } catch (error) {
    return error.message
  }
}


// Cancel Booking
export const cancelBooking = async (id, token) => {
  // console.log('the booking id ', id)
  try {
    const response = await axiosInstance.put(`/api/booking/cancel/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    return error.message
  }
}

// Confirm Booking
export const confirmBooking = async id => {
  try {
    const response = await axiosInstance.put(`/api/booking/confirm/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

// Pay with Stripe for Booking
export const payWithStripeBooking = async id => {
  try {
    const response = await axiosInstance.put(`/api/booking/pay/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}


// Function to authenticate with Facebook
const authenticateWithFacebook = async () => {
  try {
    const response = await axiosInstance.get('/api/auth/facebook')
    // No specific response handling
  } catch (error) {
    // Handle error if needed
  }
}

export const getMyBookings = async token => {
  try {
    const response = await axiosInstance.get(`/api/booking/get/my/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMyCartBookings = async token => {
  try {
    const response = await axiosInstance.get(`/api/booking/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}
// create a review for an activity
export const createReview = async (activityId,review,rating,token) => {
  try {
    const response = await axiosInstance.post(
      `/api/feedback/create`,
      { activity: activityId,
        message: review,
        rating:rating
        
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
     console.log(response.data.feedback)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

// Get All Review
export const getAllReview = async (activityId) => {
  console.log(activityId)
  try {
    const response = await axiosInstance.get(`/api/feedback/average/${activityId}`);
    console.log('response of all reviews', response.data.activity.reviews);
    return response.data;
  } catch (error) {
    return error.message;
  }
};