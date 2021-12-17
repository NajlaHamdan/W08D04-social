const express = require("express");
const routerComment = express.Router();

const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  SoftDelComment,
  deleteCommentById
} = require("./../controller/comment");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
routerComment.post("/createComment",createComment);
routerComment.get("/getComment/:id",getComment);
routerComment.post("/UpdateComment",updateComment);
routerComment.delete("/deleteComment/:id/:commentId", deleteComment);
routerComment.post("/SoftDelComment", authentication,SoftDelComment);
//for admin
routerComment.delete("/deleteCommentById/:id",authentication,authorization, deleteCommentById);
module.exports = routerComment;
