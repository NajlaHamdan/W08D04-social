const mongoose = require("mongoose");
const { stream } = require("npmlog");

const post = new mongoose.Schema({
  img: { type: String },
  desc: { type: String },
  date: { type: Date,default:Date.now },
  isDelete: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});
module.exports = mongoose.model("post", post);
