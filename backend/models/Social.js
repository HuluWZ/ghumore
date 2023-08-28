const mongoose = require("mongoose");
const { USER_TYPES,PAYMENT_METHODS } = require("../config/utils");

const SocialSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      default: "0912120121",
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Email is Unique"],
      required: [true, "Email is Required"],
    },
    plainPassword: {
      type: String,
      default: "12345678",
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: USER_TYPES,
      default: "USER",
    },
    resetToken: {
      type: String,
      trim: true
    },
    resetTokenExpiration: {
      type: Number,
      trim: true
    },
    accessToken: {
      type: String,
      trim: true
    },
    refreshToken: {
      type: String,
      trim: true
    },
    idToken: {
      type: String,
      trim: true
    },
    userId: {
      type: String,
      trim: true
    }

  },
  { timestamps: true }
);

const Social =  mongoose.model("Social", SocialSchema, "Social");
module.exports = { Social };