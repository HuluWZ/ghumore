const { User } = require("../models/User");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require("dotenv").config();

const generateToken= () => crypto.randomBytes(20).toString('hex');

exports.createAccount = async (req, res, next) => {
  try {
    const { email, password,fullName,phoneNumber,role,city,address} = req.body;
    const userInfoExist = await User.findOne({email});
    if (userInfoExist) {
      return res
        .status(400)
        .send({
          message: "Email already exist!",
          success: false
        });
    }
    
    const encryptedPassword = await bcrypt.hash(password, 8);
    const userData = {email, password: encryptedPassword,fullName,phoneNumber,plainPassword:password,city ,address,role}
    const newUser = await User.create(userData);
    // save user token
    res
      .status(201)
      .send({
        user: newUser,
        message: "Account Created Saved Succesfully !",
        success: true
      });
    await newUser.save();
  } catch (error) {
    return res.status(400).json({ message: error.message ,success:false});
  }
};

exports.createSocialAccount = async (req, res, next) => {
  try {
    console.log(" social Data ", req.body);
    const { email,locale,name,exp,iat,jti,nbf,given_name} = req.body;
    const userInfoExist = await User.findOne({ email });
    console.log(" User Info ",userInfoExist)
    if (userInfoExist) {
      const token = jwt.sign(
        { user_id: userInfoExist._id, email },
        process.env.JWT_TOKEN_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).send({ message: "User Loged in", token,success:true });
    }
    console.log(" Welcome ",nbf)
    const encryptedPassword = await bcrypt.hash(given_name, 8);
    console.log(" Welcome ",encryptedPassword,given_name)
    const userData = {
      email,
      password: encryptedPassword,
      fullName: name,
      phoneNumber: nbf,
      plainPassword: given_name,
      city: locale,
      address: locale,
    }
    const newUser = await User.create(userData);
    console.log(" User Data ", newUser._id, email);
    // save user token
     const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.JWT_TOKEN_SECRET_KEY,
        {
          expiresIn: "7d",
        }
    );
    console.log(token);

    res.status(200).send({ message: "User Loged in", token,user:newUser,success:true });
    
    await newUser.save();
  } catch (error) {
    return res.status(400).json({ message: error.message ,success:false});
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Doestn't Exist. Try Sign Up!",success:false });
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
     
      return res.status(200).send({ message: "User Loged in", token,user,success:true });
    }
    res.status(400).send({ message: "Invalid Credentials" ,success:false});
  } catch (error) {
    return res.status(500).send({ message: error.message,success:false });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select({password:0,plainPassword:0});
    if (!user) {
      return res.status(404).send({ message: "User not found",success:false });
    }

    return res.status(200).send({ user,message: "User created",success:true});
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    let newUserInfo = req.body;
    const userID = req.params.id;
    const user = await User.findById(userID,{password:0,plainPassword:0});

    if (!user) {
      return res.status(404).send({ message: "User not found.",success:false });
    }

    if(newUserInfo.hasOwnProperty("password")){
      const { password } = newUserInfo
      const encryptedPassword = await bcrypt.hash(password, 8);
      newUserInfo.password = encryptedPassword
      newUserInfo.plainPassword = password
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      newUserInfo,
      { new: true }
    );
    return res
      .status(202)
      .send({ user:updatedUser, message: "User Updated Succesfully !" ,success:true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error ,success:false});
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const {id} = req.params;
    await User.deleteOne({_id:id});
    return res
      .status(200)
      .send({ message: "Your Account has been Deleted Succesfully !" ,success:true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id, { password: 0, plainPassword: 0 });
    
    return res.status(202).send({
      user:getUser? getUser: "User Not Found",
      message: "Success !",
      success: getUser? true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};
exports.getAll = async (req, res) => {
  try {
    const getAll = await User.find({}, { password: 0 }).sort("-updatedAt");
    return res
      .status(202)
      .send({
        totalUsers: getAll.length,
        users: getAll,
        success: getAll?true:false
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success:false });
    return res.status(404).send({ message: error ,success:false});
  }
};

exports.logOut = async (req, res) => {
  try {
    req.user = null;
    return res.status(202).send({ message: "Logged Out Successfully." ,success:true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success:false });
    return res.status(404).send({ message: error,success:false });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { password,id} = req.user
    const { oldPassword, newPassword } = req.body
    const isCorrect = await bcrypt.compare(oldPassword, password);

    if (!isCorrect) {
      return res.status(404).send({ message: "Invalid Password Information", success: false });
    }
    const encryptedPassword = await bcrypt.hash(newPassword, 8);
    await User.findOneAndUpdate(
      { _id: id },
      { password:encryptedPassword, plainPassword:newPassword},
      { new: true });
    
    return res
      .status(202)
      .send({
        message: "Password updated successfully",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success:false });
    return res.status(404).send({ message: error ,success:false});
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // console.log(" User ",user)
    if (!user) {
      return res.status(404).json({ message: 'User not found',success:false });
    }
    const token = generateToken();
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + (60000 * 15); // 15 Minutes
    await user.save();
    
    return res.status(201).send({
      message: "Reset Link sent to your email Successfully.",
      Token: token,
      success: true
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};


exports.resetPassword = async (req, res) => {
  try {
      const { token } = req.params;
      const { password } = req.body;
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
     if (!user) {
       return res.status(400).json({ message: 'Invalid or expired token',success:false });
     }

    user.password = await bcrypt.hash(password, 10);// Remember to hash and salt the password
    user.plainPassword = password
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return res.status(201).send({ message: "Password reset Successfully.",success:true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};