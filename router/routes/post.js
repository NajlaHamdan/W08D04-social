const express = require("express");
const routerPost = express.Router();

const { createPost,getPosts,updateById,deleteTodo } = require("./../controller/post");
// const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");

routerPost.post("/createPost",  createPost);
routerPost.get("/getPosts/:id",  getPosts);
routerPost.post("/updateById",  updateById);
routerPost.delete("/deleteTodo/:id/:todoId",deleteTodo);
module.exports = routerPost;