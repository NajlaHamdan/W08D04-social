const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  desc: { type: String, required: true },
  date:{type:Date},
  isDelete: { type: Boolean, default: false },
  owner:  { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  post:{type: mongoose.Schema.Types.ObjectId, ref: "post"}
});
module.exports = mongoose.model("comment", comment);
