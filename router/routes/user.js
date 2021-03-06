const express = require("express");
const routerUser = express.Router();

const {
  register,
  login,
  getAllUsers,
  removeAllUsers,
  deletePosts,
  deleteComments,
  forgetPassword,
  googleSignIn,
  checkCode,
  dashboard,
} = require("./../controller/user");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerUser.post("/createUser", register);
routerUser.post("/login", login);
routerUser.get("/getAllUsers", authentication, authorization, getAllUsers);
routerUser.delete(
  "/removeAllUsers",
  authentication,
  authorization,
  removeAllUsers
);
routerUser.delete("/deletePosts", authentication, authorization, deletePosts);
routerUser.delete(
  "/deleteComments",
  authentication,
  authorization,
  deleteComments
);
routerUser.get("/dashboard", authentication, authorization, dashboard);
routerUser.post("/forgetPassword", forgetPassword);
routerUser.post("/googleSignIn", googleSignIn);
routerUser.post("/checkCode", checkCode);
module.exports = routerUser;
