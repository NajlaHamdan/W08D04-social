const mongoose = require("mongoose");

const like = new mongoose.Schema({
  owner:  { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  post:{type: mongoose.Schema.Types.ObjectId, ref: "post"}
});
module.exports = mongoose.model("like", like);
