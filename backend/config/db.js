const {set,connect} = require("mongoose");
require("dotenv").config();
const URL_LOCAL = process.env.REMOTE_MONGODB_URL
// console.log(" URL_LOCAL ", URL_LOCAL);
set("strictQuery", true);
connect(URL_LOCAL).then(() => console.log('Connected!'));
set("runValidators", true);
