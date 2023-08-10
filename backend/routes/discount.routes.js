const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getAll,
  getDiscount,
  checkDiscountAvailablity,
} = require("../controllers/Discount.Controller");


const router = express.Router();

// Activity Router
router.post("/create/",validateToken,createDiscount);
router.put("/update/:id", updateDiscount);
router.get("/get/:id", getDiscount);
router.get("/get/", getAll);
router.delete("/delete/:id", deleteDiscount,);
router.get("/check/:id", checkDiscountAvailablity);

module.exports = router;
