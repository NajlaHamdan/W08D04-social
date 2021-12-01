const express = require("express");
const routerComment = express.Router();

const {
    createComment,
    getComment,
    updateComment,
    deleteComment
}=require("./../controller/comment")

routerComment.post("/createComment",createComment);
routerComment.get("/getComment/:id",getComment);
routerComment.post("/UpdateComment",updateComment);
routerComment.delete("/deleteComment/:id/:commentId",deleteComment);

module.exports=routerComment