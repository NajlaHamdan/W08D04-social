const express = require("express");
const routerComment = express.Router();

const {
    createComment,
    getComment,
    UpdateComment
}=require("./../controller/comment")

routerComment.post("/createComment",createComment);
routerComment.get("/getComment/:id",getComment);
routerComment.post("/UpdateComment",UpdateComment);

module.exports=routerComment