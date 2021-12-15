const express = require("express");
const routerPost = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  updateById,
  deletePost,
  SoftDelPost,
  deletePostById
} = require("./../controller/post");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerPost.post("/createPost", createPost);
routerPost.get("/getPosts/:id", getPosts);
routerPost.get("/getPost/:id",getPost);
routerPost.post("/updateById",updateById);
routerPost.delete("/deletePost/:id/:postId", deletePost);
routerPost.post("/SoftDelPost",authentication, SoftDelPost);
//for admin
routerPost.delete(
  "/deletePostById/:id",
  authentication,
  authorization,
  deletePostById
);
module.exports = routerPost;
