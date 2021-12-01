const mongoose = require("mongoose");
require("dotenv").config();
const db_uri=process.env.DB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(db_uri, options).then(() => {
  console.log("DB CONNECTED");
}).catch(err=>console.log(err));
