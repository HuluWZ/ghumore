const { User } = require("../models/User");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.createAccount = async (req, res, next) => {
  try {
    const { email, password,firstName, lastName,phoneNumber} = req.body;
    const userInfoExist = await User.findOne({email});
    console.log(userInfoExist);

    if (userInfoExist) {
      return res
        .status(400)
        .send({
          message: "Email already exist!",
        });
    }
    
    const encryptedPassword = await bcrypt.hash(password, 8);
    const userData = {email, password: encryptedPassword,firstName, lastName,phoneNumber}
    const newUser = await User.create(userData);
    // save user token
    res
      .status(201)
      .send({
        user: newUser,
        message: "Account Created Saved Succesfully !",
      });

    await newUser.save();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user,email,phoneNumber);
    if (!user) {
      res.status(404).json({ message: "User Doestn't Exist. Try Sign Up!" });
      return;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_TOKEN_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
     
      return res.status(200).send({ message: "User Loged in", token });
    }
    res.status(400).send({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(req.user)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    let newUserInfo = req.body;
    const userID = req.params.id;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    
    if (newUserInfo.hasOwnProperty("password")) {
      const encryptedPassword = await bcrypt.hash(newUserInfo.password, 8);
      newUserInfo.password = encryptedPassword;
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      newUserInfo,
      { new: true }
    );
    return res
      .status(202)
      .send({ user:updatedUser, message: "User Updated Succesfully !" });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const {id} = req.params;
    await User.deleteById(id);
    return res
      .status(200)
      .send({ message: "Your Account has been Deleted Succesfully !" });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    return res.status(202).send({
      user:getUser? getUser: "User Not Found",
      message: "Success !",
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};
exports.getAll = async (req, res) => {
  try {
    const getAll = await User.find({});
    return res
      .status(202)
      .send({
        totalUsers: getAll.length,
        users: getAll,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.logOut = async (req, res) => {
  try {
    req.user = null;
    return res.status(202).send({ message: "Logged Out Successfully." });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};
