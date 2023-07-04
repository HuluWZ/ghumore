const { Activity } = require("../models/Activity");
const uploadToCloud = require("../config/cloudnary");
const { json } = require("body-parser");

require("dotenv").config();

const uploadImages = async (files) => {
  var imageUrlList = []
  for (let i = 0; i < files.length; i++){
       const {url}= await uploadToCloud(files[i].filename);
       imageUrlList.push(url);
  }
  return imageUrlList;
}

exports.createActivity = async (req, res, next) => {
  try {    
    const activityData = req.body
    const optionsFilter = [];
    const optionsData = activityData.options.map((option) => optionsFilter.push(JSON.parse(option)) )
    activityData.options = optionsFilter
    let newActivity = await Activity.create(activityData);
    var imageURLList = await uploadImages(req.files)
    // save user token
    console.log(imageURLList)
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
    let activityInfo = req.body;
    const { id } = req.params;
    const {files} = req
  
    if (files.length > 0) {
      var imageURLList = await uploadImages(files);
      activityInfo.images = imageURLList
    }

    const updatedActivity = await Activity.findOneAndUpdate(
      { _id: id },
      activityInfo,
      { new: true }
    );
    return res
      .status(202)
      .send({ activity:updatedActivity, message: "Activity Updated Succesfully !" });
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
      .send({ message: "Activity has been Deleted Succesfully !" });
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
    const { location, name } = req.query;
    // await Activity.deleteById(id);
    const searchActivity = await Activity.find({
          "name": name ? new RegExp(name,'i'): { $exists: true },
          "area": location ? new RegExp(location, 'i') : { $exists: true },
        });
      
    console.log(searchActivity,name,location)
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

exports.filterActivity = async (req, res) => {
  try {
    const { type, location, minDuration, maxDuration, minPrice, maxPrice } = req.query;
    console.log(type, location, minDuration, maxDuration,minPrice,maxPrice);
    const filterActivity = await Activity.find({
          name: type ? new RegExp(type,'i'): { $exists: true },
          area: location ? new RegExp(location, 'i') : { $exists: true },
          price: minPrice && maxPrice ? { $gte: minPrice,$lte:maxPrice }:{$exists:true},
          duration: minDuration && maxDuration ? {$gte:minDuration,$lte:maxDuration}:{$exists:true}
        });
      
    const query = {
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      location,
      type
    }
    console.log(filterActivity,query);
    return res
      .status(200)
      .send({
        filterResult: filterActivity.length>0? filterActivity: "Activity Not Found",
        message: "filter result !"
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

