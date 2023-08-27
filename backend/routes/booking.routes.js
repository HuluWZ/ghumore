const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getAllBooking,
  cancelBooking,
  confirmBooking,
  payWithStripeBooking,
  getMyBooking,
  getBookingWeekly,
  getApprovedTotalPrice,
  getMyCartBooking
} = require("../controllers/Booking.Controller");


const router = express.Router();

// Activity Router
router.post("/create/",validateToken,createBooking);
router.put("/update/:id", updateBooking);
router.get("/get/my/",validateToken,getMyBooking);
router.get("/get/:id", getBooking);
router.get("/week/", getBookingWeekly);
router.get("/approved/", getApprovedTotalPrice);
router.get("/get/", getAllBooking);
router.get("/cart",validateToken,getMyCartBooking);
router.delete("/delete/:id", deleteBooking);
router.put("/cancel/:id", cancelBooking);
router.put("/confirm/:id", confirmBooking);
router.put("/pay/:id", payWithStripeBooking);

module.exports = router;
