const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
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
const { passport } = require("../controllers/AuthSocial");
// User Account Router
router.post("/create/", createAccount);
router.post("/login/", login);
router.put("/update/:id", updateAccount);
router.get("/currentuser/",validateToken,getCurrentUser);
router.get("/get/:id", getUser);
router.get("/get/", getAll);
router.delete("/delete/:id", deleteAccount);
router.get("/logout", validateToken,logOut);
router.put("/change/password/", validateToken, changePassword);

// Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect or respond as needed after successful authentication
  res.redirect('/profile');
});

// Facebook authentication route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook authentication callback route
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  // Redirect or respond as needed after successful authentication
  res.redirect('/profile');
});


module.exports = router;
