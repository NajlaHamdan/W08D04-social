const likeModel=require("./../../db/models/like");
const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");

const toggleLike=async(req,res)=>{
    try{
        const {id,postId}=req.body
        await postModel.findOne({_id:postId}).then(async(found)=>{
            if(found){
                console.log(found);
                const newLike=new likeModel({
                    owner:id,post:postId
                });
                await likeModel.findOne({post:postId}).then(async(result)=>{
                    console.log(result);
                    if(result){
                        await result.remove();
                        //await result.save();
                        res.status("200").json("unliked")
                    }else{
                        await newLike.save(); 
                        res.status("200").json("liked")
                    }
                }).catch((err)=>{
                    res.status("404").json(err)
                })
            }else{
                res.status("404").json("no post with this id")
            }
        })
    }catch(err){
        res.status("404").json(err);
    }
}
module.exports=toggleLike