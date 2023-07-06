const express = require("express");
const { validateToken } = require("../middleware/authMiddleWare");
const {
  createAccount,
  login,
  updateAccount,
  deleteAccount,
  getUser,
  getCurrentUser,
  getAll,
  logOut,
  changePassword
} = require("../controllers/Auth.Controller");

const router = express.Router();

// User Account Router
router.post("/create/", createAccount);
router.post("/login/", login);
router.put("/update/:id", updateAccount);
router.get("/currentuser/", getCurrentUser);
router.get("/get/:id", getUser);
router.get("/get/", getAll);
router.delete("/delete/:id", deleteAccount);
router.get("/logout", logOut);
router.put("/change/password/:id", changePassword);

module.exports = router;
