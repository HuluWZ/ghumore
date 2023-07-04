const { Activity } = require("../models/Activity");
const uploadToCloud = require("../config/cloudnary");
const { json } = require("body-parser");

require("dotenv").config();


exports.createAccount = async (req, res, next) => {
  try {    
    const activityData = req.body
    const optionsFilter = [];
    var imageURLList = [];
    const optionsData = activityData.options.map((option) => optionsFilter.push(JSON.parse(option)) )
    activityData.options = optionsFilter
    let newActivity = await Activity.create(activityData);

    for (let i = 0; i < req.files.length; i++){
       const currentFile = req.files[i].filename
       const {url}= await uploadToCloud(currentFile);
       imageURLList.push(url);
     }
    // save user token
    // console.log(imageURLList)
    newActivity.images = imageURLList
    // newActivity.options = optionsFilter
    res
      .status(201)
      .send({
        activity: newActivity,
        message: "Activity Created Saved Succesfully !",
      });

    await newActivity.save();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.updateActivity = async (req, res, next) => {
  try {
    let newUserInfo = req.body;
    const userID = req.params.id;
    const user = await Activity.findById(userID);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    
    if (newUserInfo.hasOwnProperty("password")) {
      const encryptedPassword = await bcrypt.hash(newUserInfo.password, 8);
      newUserInfo.password = encryptedPassword;
    }
    const updatedUser = await Activity.findOneAndUpdate(
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

exports.deleteActivity = async (req, res) => {
  try {
    const {id} = req.params;
    await Activity.deleteById(id);
    return res
      .status(200)
      .send({ message: "Your Account has been Deleted Succesfully !" });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.getActivity = async (req, res) => {
  try {
    const getActivity = await Activity.findById(req.params.id);
    return res.status(202).send({
      activity:getActivity? getActivity: "Activity Not Found",
      message: "Success !",
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};
exports.getAllActivity = async (req, res) => {
  try {
    const getAll = await Activity.find({});
    return res
      .status(202)
      .send({
        totalActivity: getAll.length,
        activity: getAll,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.searchActivity = async (req, res) => {
  try {
    const { area, name } = req.query;
    // await Activity.deleteById(id);
    const searchActivity = await Activity.find({
          "name": name ? new RegExp(name,'i'): { $exists: true },
          "area": area ? new RegExp(area, 'i') : { $exists: true },
        });
      
    console.log(searchActivity,name,area)
    return res
      .status(200)
      .send({
        searchResult: searchActivity.length>0? searchActivity: "Activity Not Found",
        message: "Search result !"
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

