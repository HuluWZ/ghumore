const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Location Name is required"],
    },
    parent: {
      type: String,
      ref: mongoose.SchemaTypes.ObjectId,
      name:"Location"
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