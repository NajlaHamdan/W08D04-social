const express = require("express");
const routerComment = express.Router();

const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  SoftDelComment,
} = require("./../controller/comment");

routerComment.post("/createComment", createComment);
routerComment.get("/getComment/:id", getComment);
routerComment.post("/UpdateComment", updateComment);
routerComment.delete("/deleteComment/:id/:commentId", deleteComment);
routerComment.post("/SoftDelComment", SoftDelComment);
module.exports = routerComment;
