const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory
} = require("../controllers/Category.Controller");
const { uploadAnyImages,uploadImage,uploadImages } = require("../middleware/fileUploadMiddleware");

const router = express.Router();
// User Account Router
router.post("/create/", uploadImage,createCategory);
router.put("/update/:id", updateCategory);
router.get("/get/:id", getCategory);
router.get("/get/", getAllCategory);
router.delete("/delete/:id", deleteCategory);


module.exports = router;
