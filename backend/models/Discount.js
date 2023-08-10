const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const BookingSchema = mongoose.Schema(
  {
    code: {
      type: String,
      min: 5,
      max: 10,
      required: [true, "Coupon Code is required"],
      unique: true
    },
    startDate: { type: Date, required: [true, "Discount Start Date is required"] },
    endDate:{ type:Date,required:[true," Discount  End Date is required"]},
    rate: {
      type: Number,
      min: 1,
      max: 100,
      default: 1,
      required: [true, "Coupon Rate is required"],
    },
    status: {
      type: String,
      enum: ["Pending","Approved",""],
      default: "Pending",
      required: [true, "Status is required"],
    }
  },
  { timestamps: true }
);

const Discount =  mongoose.model("Coupon", BookingSchema, "Coupon");
module.exports = { Discount };