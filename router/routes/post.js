const express = require("express");
const routerPost = express.Router();

const {
  createPost,
  getPosts,
  updateById,
  deletePost,
  SoftDelPost,
} = require("./../controller/post");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerPost.post("/createPost",authentication, createPost);
routerPost.get("/getPosts/:id",authentication, getPosts);
routerPost.post("/updateById", authentication,updateById);
routerPost.delete("/deletePost/:id/:postId",authentication, deletePost);
routerPost.post("/SoftDelPost",authentication, SoftDelPost);
module.exports = routerPost;
