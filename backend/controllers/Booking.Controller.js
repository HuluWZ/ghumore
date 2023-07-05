const { Booking } = require("../models/Booking");

require("dotenv").config();


exports.createBooking = async (req, res, next) => {
  try {    
    const bookingData = req.body
    bookingData.totalPrice = (bookingData.option.unitPrice * bookingData.quantity).toFixed(2);
    let newBooking = await Booking.create(bookingData);
    res
      .status(201)
      .send({
        booking: newBooking,
        message: "Activity Booked Succesfully !",
      });

    await newBooking.save();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.updateBooking = async (req, res, next) => {
  try {
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
      .send({ booking:updatedBooking, message: "Booking Updated Succesfully !" });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const {id} = req.params;
    await Booking.deleteById(id);
    return res
      .status(200)
      .send({ message: "Booking has been Deleted Succesfully !" });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const getBooking = await Booking.findById(req.params.id).populate("activity");
    return res.status(202).send({
      booking: getBooking? getBooking: "Booking Not Found",
      message: "Success !",
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};
exports.getAllBooking = async (req, res) => {
  try {
    const getAll = await Booking.find({}).populate("activity");
    return res
      .status(202)
      .send({
        totalBooking: getAll.length,
        booking: getAll,
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
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
        message: "Cancel result !"
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
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
        message: "Confirm result !"
      });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};
