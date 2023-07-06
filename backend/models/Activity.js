const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

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
    area: {
      type: String,
      trim: true,
      required: [true, "Area is required"],
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
      type: String,
      required: [true, "Location is required"],
    },
    availablity: {
      type: Date,
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