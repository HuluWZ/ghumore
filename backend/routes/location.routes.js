const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation,
  getAllLocation
} = require("../controllers/Location.Controller");
const { uploadAnyImages,uploadImage,uploadImages } = require("../middleware/fileUploadMiddleware");

const router = express.Router();
// User Account Router
router.post("/create/",uploadImage,createLocation);
router.put("/update/:id", uploadAnyImages,updateLocation);
router.get("/get/:id", getLocation);
router.get("/get/", getAllLocation);
router.delete("/delete/:id", deleteLocation);


module.exports = router;
