const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/Ghumore").then(() => console.log('Connected!'));

mongoose.set("runValidators", true);
