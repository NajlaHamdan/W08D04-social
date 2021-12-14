const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  userName: { type: String, required: true, lowercase: true, unique: true },
  avatar: { type: String },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "role" }],
  posts: [
    {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    },
  ],
  verified: { type: Boolean, default: false },
  code: { type: String },
  // comments: [
  //   {
  //     type: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
  //   },
  // ],
  // likes: [
  //   {
  //     type: { type: mongoose.Schema.Types.ObjectId, ref: "like" },
  //   },
  // ],
});

module.exports = mongoose.model("user", user);
