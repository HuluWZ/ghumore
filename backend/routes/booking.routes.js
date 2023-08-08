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
  getMyBooking
} = require("../controllers/Booking.Controller");


const router = express.Router();

// Activity Router
router.post("/create/",validateToken,createBooking);
router.put("/update/:id", updateBooking);
router.get("/get/my/",validateToken,getMyBooking);
router.get("/get/:id", getBooking);
router.get("/get/", getAllBooking);
router.delete("/delete/:id", deleteBooking);
router.put("/cancel/:id", cancelBooking);
router.put("/confirm/:id", confirmBooking);
router.put("/pay/:id", payWithStripeBooking);

module.exports = router;
