const { Activity } = require("../models/Activity");
const { Feedback } = require("../models/Feedback");
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

exports.uploadOneImage = async (req, res, next) => {
  try {
    const { files } = req;
    var imageUrlList = []
    
    const {url}= await uploadToCloud(files[i].filename);
    
    res
      .status(201)
      .send({
        images: url?url:"No File Uploaded",
        message: "Image uploaded Succesfully !",
        success: true
      });
  }catch(error){
    return res.status(400).json({ message: error.message,success: false });
  }
}

exports.uploadMultipleImages = async (req, res, next) => {
  try {
    const { files } = req;
    var imageUrlList = []
    for (let i = 0; i < files.length; i++){
         const {url}= await uploadToCloud(files[i].filename);
         imageUrlList.push(url);
    }
    res
      .status(201)
      .send({
        images: imageUrlList,
        message: "Image uploaded Succesfully !",
        success: true
      });
  }catch(error){
    return res.status(400).json({ message: error.message,success: false });
  }
}

exports.createActivity = async (req, res, next) => {
  try {    
    var activityData = req.body
    activityData.availableSpot = activityData.totalCapacity
    let newActivity = await Activity.create(activityData);
    var imageURLList = await uploadImages(req.files)
    newActivity.images = imageURLList
    res
      .status(201)
      .send({
        activity: newActivity,
        message: "Activity Created Saved Succesfully !",
        success: true
      });

    await newActivity.save();
  } catch (error) {
    return res.status(400).json({ message: error.message,success: false });
  }
};


exports.updateActivity = async (req, res, next) => {
  try {
    let activityInfo = req.body;
    const { id } = req.params;
    const { files } = req
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
      .send({
        activity: updatedActivity,
        message: "Activity Updated Succesfully !",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error, success: false });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const {id} = req.params;
    await Activity.deleteOne({_id: id });
    return res
      .status(200)
      .send({ message: "Activity has been Deleted Succesfully !",success: true });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};

exports.getActivity = async (req, res) => {
  try {
    const getActivity = await Activity.findById(req.params.id).populate("location").populate("category");
    const getAll = await Feedback.find({ activity: req.params.id },{activity:0}).populate("user", { fullName: 1, email: 1, phoneNumber: 1 });
    let total = 0
    const totalRating = getAll.map((item)=> total += item.rating)
    getActivity.reviews = getAll
    getActivity.averageRating = total / getAll.length 
    getActivity.totalReview = getAll.length
    console.log("Get Review = ",total,getAll.length)
    return res.status(202).send({
      activity:getActivity? getActivity: "Activity Not Found",
      message: "Success !",
      success: getActivity?true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error });
  }
};

exports.getAllActivity = async (req, res) => {
  try {
    const getAll = await Activity.find({}).populate('location')
      .populate('category')
      .sort("-updatedAt");
    
    for (const activity of getAll) {
      const getAllFeedback = await Feedback.find({ activity: activity.id },{activity:0}).populate("user", { fullName: 1, email: 1, phoneNumber: 1 });
      let total = 0
      const totalRating = getAllFeedback.map((item) => total += item.rating)
      activity.reviews = getAllFeedback
      activity.averageRating = total / getAllFeedback.length 
      activity.totalReview = getAllFeedback.length
    }
  
    return res
      .status(202)
      .send({
        totalActivity: getAll.length,
        activity: getAll,
        success: getAll ? true:false,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message ,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.searchActivity = async (req, res) => {
  try {
    const { category,location, name } = req.query;
      
   const place = await Activity.aggregate([
      {
        $lookup: {
          from: "Location",
          localField: "location",
          foreignField: "_id",
          as: "Location"
        }
      },
      { $unwind: "$Location" },
      { $unwind:"$Location._id"},
      {
        $lookup: {
          from: "Category",
          localField: "category",
          foreignField: "_id",
          as: "Category"
        }
      },
      { $unwind: "$Category" },
      {
        $match: {
          "name": name ? new RegExp(name, 'i') : { $exists: true },
          "Location.name": location ? new RegExp(location, 'i') : { $exists: true },
          "Category.name": category ? new RegExp(category, 'i') : { $exists: true },
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          category: "$Category",
          location: "$Location",
          price: 1,
          images: 1,
          options: 1,
          duration: 1,
          totalCapacity: 1,
          organizer: 1,
          rating: 1,
          endDate:1,
          startDate:1,
          availableSpot:1,
          lastBookingDate:1
        }
      }
   ])
    return res
      .status(200)
      .send({
        searchResult: place,
        message: place.length>0? ` ${place.length} Result  found`: "No Result Not Found",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.filterActivity = async (req, res) => {
  try {
    const { category, location, minDuration, maxDuration, minPrice, maxPrice } = req.query;
    const filterActivity = await Activity.find({
          category: category ? category: { $exists: true },
          location: location ? location: { $exists: true },
          price: minPrice && maxPrice ? { $gte: minPrice,$lte:maxPrice }:{$exists:true},
          duration: minDuration && maxDuration ? {$gte:minDuration,$lte:maxDuration}:{$exists:true}
        });
 
    return res
      .status(200)
      .send({
        filterResult: filterActivity.length>0? filterActivity: "Activity Not Found",
        message: filterActivity.length>0? `${filterActivity.length} Result Found`: "No Activity  Found",
        success:true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};


exports.checkAvailablity = async (req, res) => {
  try {
    const { activity, quantity, date } = req.query;
    const isAvailable = await Activity.find({
            "_id": activity ? activity : { $exists: true },
            "availableSpot": quantity ? { $gte: quantity } : { $exists: true },
            "lastBookingDate": date ? { $gte: new Date(date) } : {$exists:true}
    });
      
    return res
      .status(200)
      .send({
        isAvailable: isAvailable.length >0?true:false,
        message: isAvailable.length > 0 ? `Available` : "No Available",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};