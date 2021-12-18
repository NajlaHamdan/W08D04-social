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

routerPost.post("/createPost",authentication, createPost);
routerPost.get("/getPosts/:id",authentication, getPosts);
routerPost.get("/getPost/:id",authentication,getPost);
routerPost.post("/updateById",authentication,updateById);
routerPost.delete("/deletePost/:id/:postId",authentication, deletePost);
routerPost.post("/SoftDelPost",authentication, SoftDelPost);
//for admin
routerPost.delete(
  "/deletePostById/:id",
  authentication,
  authorization,
  deletePostById
);
module.exports = routerPost;
