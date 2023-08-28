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
  changePassword,
  forgotPassword,
  resetPassword,createSocialAccount
} = require("../controllers/Auth.Controller");

const router = express.Router();
const { passport } = require("../controllers/AuthSocial");
// User Account Router
router.post("/create/", createAccount);
router.post('/socail', createSocialAccount);
router.post("/login/", login);
router.put("/update/:id", updateAccount);
router.get("/currentuser/",validateToken,getCurrentUser);
router.get("/get/:id", getUser);
router.get("/get/", getAll);
router.delete("/delete/:id", deleteAccount);
router.get("/logout", validateToken,logOut);
router.put("/change/password/", validateToken, changePassword);
// FORGOT AND RESET PASSWORD
router.post('/forgot', forgotPassword)
router.post('/reset/:token', resetPassword);

// Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  console.log(" Request ",req," Response ",res," Redirection ")
  // Redirect or respond as needed after successful authentication
  res.redirect('http://localhost:3000/profile');
});
// Go To Profile
// router.get("/profile", (req, res) => {
//   console.log(" Profile Page ",req," Response ",res)
//   req.send(req.user)
// })
// Facebook authentication route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook authentication callback route
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  // Redirect or respond as needed after successful authentication
  res.redirect('/profile');
});


module.exports = router;
