const express = require("express");
const { validateToken } = require("../middleware/authMiddleWare");
const {
  createAccount,
  updateAccount,
  deleteAccount,
  getActivity,
  getAllActivity,
  searchActivity
} = require("../controllers/Activity.Controller");

const { uploadAnyImage,uploadImage,uploadImages } = require("../middleware/fileUploadMiddleware");

const router = express.Router();

// Activity Router
router.post("/create/", uploadImages,createAccount);
// router.put("/update/:id", validateToken, updateAccount);
router.get("/get/:id", getActivity);
router.get("/get/", getAllActivity);
// router.delete("/delete/:id", validateToken, deleteAccount);
router.get("/search",searchActivity);

module.exports = router;
