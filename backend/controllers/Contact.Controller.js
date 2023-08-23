const { Contact } = require("../models/Contact");

require("dotenv").config();

const uploadToCloud = require("../config/cloudnary");

exports.createFeedback = async (req, res, next) => {
  try {    
    const feedback = req.body
    let newLocation = await Contact.create(feedback);
    
    res
      .status(201)
      .send({
        contact: newLocation,
        message: "Message Added Succesfully !",
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
    const updatedLocation = await Contact.findOneAndUpdate(
      { _id: id },
      locationInfo,
      { new: true }
    );

    return res
      .status(202)
      .send({ contact:updatedLocation, message: "Message Updated Succesfully !",success: true  });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const {id} = req.params;
    await Contact.deleteOne({_id:id});
    return res
      .status(200)
      .send({ message: "Message has been Deleted Succesfully !" ,success: true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const getLocation = await Contact.findById(req.params.id)
    return res.status(202).send({
      contact: getLocation,
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
    const getAll = await Contact.find({}).sort("-updatedAt");
    
    return res
      .status(202)
      .send({
        totalContact: getAll.length,
        contact: getAll,
        success: true,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message ,success: false});
    return res.status(404).send({ message: error,success: false });
  }
};
