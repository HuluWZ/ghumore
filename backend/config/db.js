const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/Ghumore").then(() => console.log('Connected!'));
;
//   { useNewUrlParser: true },
//   (err) => 
//     if (!err) {
//       console.log("MongoDB connection succeeded.");
//     } else {
//       console.log(
//         "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
//       );
//     }
//   }
// );
mongoose.set("runValidators", true);
