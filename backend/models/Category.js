const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category Name is required"],
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"Category"
    },
    image:{
      type: String,
      required: [true, "Category Image  is required"],
    }
  },
  { timestamps: true }
);

const Category =  mongoose.model("Category", CategorySchema, "Category");
module.exports = { Category };