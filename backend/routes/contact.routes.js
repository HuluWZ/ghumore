const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getAllFeedback
} = require("../controllers/Contact.Controller");


const router = express.Router();

// Activity Router
router.post("/create", createFeedback);
router.put("/update/:id", updateFeedback);
router.get("/get/:id", getFeedback);
router.get("/get/", getAllFeedback);
router.delete("/delete/:id", deleteFeedback);

module.exports = router;
