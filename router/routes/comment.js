const express = require("express");
const routerComment = express.Router();

const {
    createComment
}=require("./../controller/comment")

routerComment.post("/createComment",createComment)


module.exports=routerComment