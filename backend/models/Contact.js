const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email  is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    }
  },
  { timestamps: true }
);

const Contact =  mongoose.model("Contact", ContactSchema, "Contact");
module.exports = { Contact };