const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const FeedbackSchema = mongoose.Schema(
  {
     user: {
      type: ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    activity: {
      type: ObjectId,
      ref: "Activity",
      required: [true, "Activity is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      required: [true, "Feedback rating is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    }
  },
  { timestamps: true }
);

const Feedback =  mongoose.model("Feedback", FeedbackSchema, "Feedback");
module.exports = { Feedback };