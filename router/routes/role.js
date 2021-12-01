const express = require("express");
const routerRole = express.Router();

const { createRole, getRole } = require("./../controller/role");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

routerRole.post("/createRole",authentication,authorization, createRole);
routerRole.get("/getRole", authentication,authorization,getRole);

module.exports = routerRole;
