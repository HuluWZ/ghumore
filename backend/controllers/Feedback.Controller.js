const { Feedback } = require("../models/Feedback");
const { Activity } = require("../models/Activity");

require("dotenv").config();

const uploadToCloud = require("../config/cloudnary");

exports.createFeedback = async (req, res, next) => {
  try {    
    const feedback = req.body
    feedback.user = req.user.id
    let newLocation = await Feedback.create(feedback);
    
    res
      .status(201)
      .send({
        feedback: newLocation,
        message: "Feedback Added Succesfully !",
        success: true
      });

    await newLocation.save();
  } catch (error) {
    return res.status(400).json({ message: error.message ,success: false });
  }
};


exports.updateFeedback = async (req, res, next) => {
  try {
    console.log(" Welcome ");
    const { id } = req.params;
    let locationInfo = req.body;
    console.log(" Data ",locationInfo,id)
    const updatedLocation = await Feedback.findOneAndUpdate(
      { _id: id },
      locationInfo,
      { new: true }
    );

    return res
      .status(202)
      .send({ feedback:updatedLocation, message: "Feedback Updated Succesfully !",success: true  });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const {id} = req.params;
    await Feedback.deleteOne({_id:id});
    return res
      .status(200)
      .send({ message: "Feedback has been Deleted Succesfully !" ,success: true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const getLocation = await Feedback.findById(req.params.id)
      .populate('user',{ password: 0, plainPassword: 0, createdAt: 0, updatedAt: 0,address:0,city:0 })
      .populate('activity',{location:0,options:0,category:0,totalCapacity:0, createdAt: 0, updatedAt: 0,availableSpot:0,startDate:0,endDate:0,lastBookingDate:0,overview:0,rating:0,organizer:0,duration:0,durationType:0});
    return res.status(202).send({
      feedback: getLocation,
      message: "Success !",
      success: getLocation?true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const getAll = await Feedback.find({})
      .populate('user',{ password: 0, plainPassword: 0, createdAt: 0, updatedAt: 0,address:0,city:0 })
      .populate('activity',{location:0,options:0,category:0,totalCapacity:0, createdAt: 0, updatedAt: 0,availableSpot:0,startDate:0,endDate:0,lastBookingDate:0,overview:0,rating:0,organizer:0,duration:0,durationType:0})
      .sort("-updatedAt");
    
    return res
      .status(202)
      .send({
        totalFeedback: getAll.length,
        feedback: getAll,
        success: true,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message ,success: false});
    return res.status(404).send({ message: error,success: false });
  }
};

exports.getAverageFeedbackActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const getAll = await Feedback.find({ activity: id },{activity:0}).populate("user", { fullName: 1, email: 1, phoneNumber: 1 });
    let total = 0
    const totalRating = getAll.map((item)=> total += item.rating)
    var getActive = await Activity.findOne({ id: id });
    getActive.reviews = getAll
    getActive.averageRating = total / getAll.length 
    getActive.totalReview = getAll.length
    // console.log(" All Feedback ",total/getAll.length)
        return res
      .status(202)
      .send({
        activity: getActive,
        success: true,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message ,success: false});
    return res.status(404).send({ message: error,success: false });
  }
};

