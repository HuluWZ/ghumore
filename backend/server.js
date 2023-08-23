require('dotenv').config()
require("./config/db");

const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const authApi = require("./routes/auth.routes");
const activityApi = require("./routes/activity.routes");
const bookingApi = require("./routes/booking.routes");
const locationApi = require('./routes/location.routes');
const categoryApi = require('./routes/category.routes');
const discountApi = require('./routes/discount.routes');
const feedbackApi = require('./routes/feedback.routes');
const contactApi = require('./routes/contact.routes');

const session = require('express-session');
const app = express();

app.use(cors());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/", authApi);
app.use("/api/activity/", activityApi);
app.use("/api/booking/", bookingApi);
app.use("/api/location/", locationApi);
app.use("/api/category/", categoryApi);
app.use("/api/discount/", discountApi);
app.use("/api/feedback/", feedbackApi);
app.use('/api/contact/', contactApi);

app.get("/", function (req, res) {
  res.send("Ghumore India App API Gateway.");
});

app.use((err, req, res) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors[2]).forEach((key) =>
      valErrors.push(err.errors.message[1])
    );
    res.status(422).send(valErrors);
  }
});

const server = app.listen(process.env.PORT || 80, () =>
  console.log(`Server started 🔥 at port ${process.env.PORT}`)
);
