const { Location } = require("../models/Location");

require("dotenv").config();

const uploadToCloud = require("../config/cloudnary");

exports.createLocation = async (req, res, next) => {
  try {    
    const locationData = req.body
    if (req.file) {
      const { url } = await uploadToCloud(req.file.filename);
      locationData.image = url;
    }
    let newLocation = await Location.create(locationData);
    
    res
      .status(201)
      .send({
        location: newLocation,
        message: "Location Added Succesfully !",
        success: true
      });

    await newLocation.save();
  } catch (error) {
    return res.status(400).json({ message: error.message ,success: false });
  }
};


exports.updateLocation = async (req, res, next) => {
  try {
    var locationInfo = req.body;
    const { id } = req.params;
    if (req.files.length > 0) {
      const { url } = await uploadToCloud(req.files[0].filename);
      locationInfo.image = url;
      console.log(" Image url ",url,req.file)
    }
    const updatedLocation = await Location.findOneAndUpdate(
      { _id: id },
      locationInfo,
      { new: true }
    );

    return res
      .status(202)
      .send({ location:updatedLocation, message: "Location Updated Succesfully !",success: true  });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const {id} = req.params;
    await Location.deleteOne({_id:id});
    return res
      .status(200)
      .send({ message: "Location has been Deleted Succesfully !" ,success: true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const getLocation = await Location.findById(req.params.id).populate("parent");
    return res.status(202).send({
      location: getLocation,
      message: "Success !",
      success: getLocation?true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};

exports.getAllLocation = async (req, res) => {
  try {
    const getAll = await Location.find({}).populate("parent").sort("-updatedAt");
    return res
      .status(202)
      .send({
        totalLocation: getAll.length,
        location: getAll,
        success: true,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message ,success: false});
    return res.status(404).send({ message: error,success: false });
  }
};


