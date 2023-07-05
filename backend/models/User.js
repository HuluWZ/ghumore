const mongoose = require("mongoose");
const { USER_TYPES,PAYMENT_METHODS } = require("../config/utils");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full Name is required"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: [true, "Phone Number is Unique"],
      required: [true, "Phone Number is required"],
    },
    email: {
      type: String,
      unique: [true, "Email is Unique"],
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: USER_TYPES,
      default: "USER",
    }
  },
  { timestamps: true }
);

const User =  mongoose.model("User", UserSchema, "User");
module.exports = { User };