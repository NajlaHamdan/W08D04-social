const mongoose = require("mongoose");
const { stream } = require("npmlog");

const post = new mongoose.Schema({
  img: { type: String },
  desc:{type:String },
  date:{type:Date},
  isDelete: { type: Boolean, default: false },
  owner:  { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes:  [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }]
});
module.exports = mongoose.model("post", post);
