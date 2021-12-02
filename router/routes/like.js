const express = require("express");
const routerLike = express.Router();

const toggleLike = require("./../controller/like");
const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");

routerLike.post("/toggleLike",authentication, toggleLike);

module.exports = routerLike;
