const { Discount } = require("../models/Discount");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getToday = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

exports.createDiscount = async (req, res, next) => {
  try {
    console.log(req.body)
    const newDiscount = await Discount.create(req.body);
    // save user token
    res
      .status(201)
      .send({
        discount: newDiscount,
        message: "Discount Added Succesfully !",
        success: true
      });
    await newDiscount.save();
  } catch (error) {
    return res.status(400).json({ message: error.message ,success:false});
  }
};


exports.updateDiscount = async (req, res, next) => {
  try {
    const { id } = req.params;
    let newDis = req.body;
    const updatedDis = await Discount.findOneAndUpdate(
      { _id: id },
      newDis,
      { new: true }
    );
    return res
      .status(202)
      .send({ discount:updatedDis, message: "Discount Updated Succesfully !" ,success:true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error ,success:false});
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const {id} = req.params;
    await Discount.deleteOne({_id:id});
    return res
      .status(200)
      .send({ message: "Discount has been Deleted Succesfully !" ,success:true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.getDiscount = async (req, res) => {
  try {
    const getDis = await Discount.findById(req.params.id);
    
    return res.status(202).send({
      discount:getDis? getDis: "Discount Not Found",
      message: "Success !",
      success: getDis? true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.checkDiscountAvailablity = async (req, res) => {
  try {
    const { date } = req.query;
    const {id} = req.params
    const formattedDate = getToday();
    const query = {
      _id: id ? id : { $exists: true },
      startDate:
        { $lte: date ? date : formattedDate }, // Check if startDate is less than or equal to endDate
      endDate:
        { $gte: date ? date : formattedDate },   // Check if endDate is greater than or equal to startDate
    };

    const getDis = await Discount.find(query);
    return res.status(202).send({
      discount:getDis? getDis: "Discount Not Found",
      isAvailable: getDis?.length ? true :false,
      message: "Success !",
      success: getDis? true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const getAll = await Discount.find({}).sort("-updatedAt");
    return res
      .status(202)
      .send({
        totalDiscounts: getAll.length,
        discounts: getAll,
        success: getAll?true:false
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success:false });
    return res.status(404).send({ message: error ,success:false});
  }
};
