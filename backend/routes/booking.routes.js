const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getAllBooking,
  payBooking,
  cancelBooking,
  confirmBooking
} = require("../controllers/Booking.Controller");


const router = express.Router();

// Activity Router
router.post("/create/",createBooking);
router.put("/update/:id", updateBooking);
router.get("/get/:id", getBooking);
router.get("/get/", getAllBooking);
router.delete("/delete/:id", deleteBooking);
router.put("/cancel:id", cancelBooking);
router.put("/confirm:id", confirmBooking);

module.exports = router;
