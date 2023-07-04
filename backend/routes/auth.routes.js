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
} = require("../controllers/Auth.Controller");

const router = express.Router();

// User Account Router
router.post("/create/", createAccount);
router.post("/login/", login);
router.put("/update/:id", validateToken, updateAccount);
router.get("/currentuser/", validateToken, getCurrentUser);
router.get("/get/:id", validateToken, getUser);
router.get("/get/", validateToken, getAll);
router.delete("/delete/:id", validateToken, deleteAccount);
router.get("/logout", validateToken, logOut);

module.exports = router;
