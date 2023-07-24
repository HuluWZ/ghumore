const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Location = require("./Location")
const Category = require("./Category")

const optionsSchema = mongoose.Schema({
  name: { type:String,required:[true,"Option Name is required"] },
  description: { type: String,required:[true,"Option Description is required"] },
  unitPrice: { type: Number,required:[true,"Option Unit Price is required"] },
  time: [{ type: String ,required:[true,"Option Available Time is required"]}]
},{ _id: false })

const ActivitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
    },
    images: [{ type: String,required:[true,"Images is required"] }],
    duration: {
      type: Number,
      trim: true,
      required: [true, "Duration is required"]
    },
    durationType: {
      type: String,
      enum: ["hours", "days", "months", "years"],
      default: "days",
    },
    location: {
      type: ObjectId,
      ref:"Location",
      required: [true, "Location is required"],
    },
    category: {
      type: ObjectId,
      ref:"Category",
      required: [true, "Location is required"],
    },
    availablity: {
      type: Date,
    },
    startDate: {
      type: Date,
      required: [true, "Start Date is required"]
    },
    endDate: {
       type: Date,
       required:[true,"End Date is required"]
    },
    options: [{ type: optionsSchema,required:[true,"Options is required"] }],
    totalCapacity: {
      type: Number,
      required:[true,"Total Spaces is required"]
    },
    organizer: {
      type: String,
      required: [true,"Organizer Name is required"]
    },
    rating: {
      type: Number,
      min: 4,
      max: 5,
      default:4.5,
      required:[true,"Reviews is required"]
    }
  },
  { timestamps: true }
);

const Activity =  mongoose.model("Activity", ActivitySchema, "Activity");
module.exports = { Activity };