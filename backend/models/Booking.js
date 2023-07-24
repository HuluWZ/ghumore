const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const User = require("./User");

const optionSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  description: { type: String, required: [true, "Description is required"] },
  unitPrice: { type: Number, required: [true, "Unit Price is required"] },
  time: { type: String, required: [true, "Available Time is required"] }
}, { _id: false });

const travellerDetailsSchema = mongoose.Schema({ firstName: String, lastName: String },{_id: false});

const contactDetailsSchema = mongoose.Schema({
      firstName: { type: String },
      lastName: { type: String},
      email: { type: String },
      phoneNumber:{type:String}
},
  { _id: false });

const BookingSchema = mongoose.Schema(
  {
    activity: {
      type: ObjectId,
      ref: "Activity",
      required: [true, "Activity is required"],
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    option: {
      type: optionSchema,
      required: [true, "Duration is required"]
    },
    date:{ type:Date,required:[true,"Date is required"]},
    quantity: {
      type: Number,
      min: 1,
      default:1,
      required: [true, "Quantity is required"],
    },
    pickupLocation: {
      type: String,
    },
    promoCode: {
      type: String,
    },
    contactDetails: contactDetailsSchema ,
    travellerDetails: [travellerDetailsSchema],
    totalPrice:{type:Number,required:[true,"Total Price is required"],default:0},
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled","Paid","Waiting","Completed","Refunded"],
      default: "Pending",
      required: [true, "Status is required"],
    }
  },
  { timestamps: true }
);

const Booking =  mongoose.model("Booking", BookingSchema, "Booking");
module.exports = { Booking };