const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Location Name is required"],
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"Location"
    },
    image:{
      type: String,
      trim: true,
      required:true
    },
    url: {
      type: String,
      unique: [true, "Location url is Unique"],
      required: [true, "Location url is Required"],
    }
  },
  { timestamps: true }
);

const Location =  mongoose.model("Location", LocationSchema, "Location");
module.exports = { Location };