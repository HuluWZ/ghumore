require("dotenv").config();
require("./config/db");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const usersApi = require("./router/User.routes");
const authApi = require("./routes/auth.routes");
const activityApi = require("./routes/activity.routes");
const bookingApi = require("./routes/booking.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth/", authApi);
app.use("/api/activity/", activityApi);
app.use("/api/booking/", bookingApi);

// app.use("/api/users/", usersApi);
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
