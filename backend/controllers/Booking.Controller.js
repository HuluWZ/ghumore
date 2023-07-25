const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { Booking } = require("../models/Booking");
const { Activity} = require("../models/Activity");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

exports.createBooking = async (req, res, next) => {
  try {    
    const bookingData = req.body
    bookingData.totalPrice = (bookingData.option.unitPrice * bookingData.quantity).toFixed(2);
    bookingData.user = req.user.id
    //TODO Update availableSpot for activity by incrementing from quantity
    let newBooking = await Booking.create(bookingData);
    const amount = parseInt(bookingData.quantity)
    await Activity.
      findByIdAndUpdate(bookingData.activity , {
          $inc: { availableSpot: -amount }
        }
      );
    res
      .status(201)
      .send({
        booking: newBooking,
        message: "Activity Booked Succesfully !",
        success: true
      });
      await newBooking.save();
  } catch (error) {
    return res.status(400).json({ message: error.message ,success: false });
  }
};


exports.updateBooking = async (req, res, next) => {
  try {
    console.log(" Update Booking API ", req.params.id, req.body)
    let bookingInfo = req.body;
    const { id } = req.params;
    // TODO check for options and update total price with quantity
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      bookingInfo,
      { new: true }
    );

    return res
      .status(202)
      .send({ booking:updatedBooking, message: "Booking Updated Succesfully !",success: true  });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    console.log(" Delete Booking ", req.params.id)
    const {id} = req.params;
    await Booking.deleteOne({_id:id});
    return res
      .status(200)
      .send({ message: "Booking has been Deleted Succesfully !" ,success: true});
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error,success: false });
  }
};

exports.getBooking = async (req, res) => {
  try {
    console.log(" Get Booking ", req.params.id)
    // console.log(" b ", req.params)
    const getBooking = await Booking.findById(req.params.id).
    populate("user",{password:0,plainPassword:0,createdAt:0,updatedAt:0}).sort("-updatedAt");
    // console.log(getBooking);
    return res.status(202).send({
      booking: getBooking,
      message: "Success !",
      success: getBooking?true:false
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};
exports.getAllBooking = async (req, res) => {
  try {
    const getAll = await Booking.find({}).
    populate("user",{password:0,plainPassword:0,createdAt:0,updatedAt:0}).sort("-updatedAt");
    return res
      .status(202)
      .send({
        totalBooking: getAll.length,
        booking: getAll,
        success: true,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message ,success: false});
    return res.status(404).send({ message: error,success: false });
  }
};

exports.payWithStripeBooking = async (req, res) => {
  try {
    console.log(" a ")
    const { id } = req.params
    const booking = await Booking.findById(id);
    console.log(" Booking : ", booking);

    const session = await stripe.checkout.sessions.create({ 
    payment_method_types: ["card"], 
    line_items: [ 
      { 
        price:booking.activity,
        quantity: booking.quantity,
        currency: "inr",
      } 
    ], 
    mode: "payment", 
    success_url: "http://localhost:4000/success", 
    cancel_url: "http://localhost:4000/cancel", 
    }); 
    
    console.log(" Session ID : ", session);
    // const cancelBooking = await Booking.findByIdAndUpdate(id, { status: "Paid" });
    return res
      .status(200)
      .send({
        bookingRef: session?session.id:null,
        message: " Payment Stripe !",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};


exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params
    const cancelBooking = await Booking.findByIdAndUpdate(id, {status:"Cancelled"})
    return res
      .status(200)
      .send({
        booking: cancelBooking,
        message: "Cancel result !",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { id } = req.params
    const confirmBooking = await Booking.findByIdAndUpdate(id, { status: "Confirmed" });
    
    return res
      .status(200)
      .send({
        booking:confirmBooking,
        message: "Confirm result !",
        success: true
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message,success: false });
    return res.status(404).send({ message: error ,success: false});
  }
};

exports.getMyBooking =async (req, res) => {
  try {
    const { _id } = req.user
    const getMyHistory = await Booking.find({
      user: _id,
      status: { $in: ['Completed', 'Refunded'] }
    }).sort("-updatedAt");
    const getMyUpcoming = await Booking.find({
      user: _id,
      status: { $in: ["Pending", "Confirmed", "Cancelled", "Paid", "Waiting"] }
    }).sort("-updatedAt");
    return res
      .status(202)
      .send({
        history: getMyHistory,
        upcoming: getMyUpcoming,
        success: true,
      });
  } catch (error) {
    console.log(error);
    if (error.message) return res.status(404).send({ message: error.message ,success: false});
    return res.status(404).send({ message: error,success: false });
  }
};