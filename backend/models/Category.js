const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category Name is required"],
    },
    parent: {
      type: String,
      ref: mongoose.SchemaTypes.ObjectId,
      name:"Category"
    },
    image:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
);

const Category =  mongoose.model("Category", CategorySchema, "Category");
module.exports = { Category };