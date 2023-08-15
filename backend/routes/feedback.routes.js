const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getAllFeedback,
  getAverageFeedbackActivity
} = require("../controllers/Feedback.Controller");


const router = express.Router();

// Activity Router
router.post("/create", validateToken, createFeedback);
router.put("/update/:id", updateFeedback);
router.get("/get/:id", getFeedback);
router.get("/get/", getAllFeedback);
router.delete("/delete/:id", deleteFeedback);
router.get("/average/:id", getAverageFeedbackActivity);

module.exports = router;
