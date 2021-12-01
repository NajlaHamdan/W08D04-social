const express = require("express");
const routerUser = express.Router();

const {
  register,
  login,
  getAllUsers,
  removeAllUsers,
} = require("./../controller/user");

// const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");

routerUser.post("/createUser", register);
routerUser.post("/login", login);
// routerUser.get("/getAllUsers", getAllUsers);
// routerUser.delete(
//   "/removeAllUsers",
// //   authentication,
// //   authorization,
//   removeAllUsers
// );
module.exports = routerUser;
