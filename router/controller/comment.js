const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");

const createComment = async (req, res) => {
  try {
    const { id, postId, desc } = req.body;
    await userModel.findById(id).then(async(user) => {
      if (user) {
        await postModel
          .findOne({ _id: postId })
          .then(async(post) => {
            if (post) {
              const newComment = new commentModel({
                desc,
                owner: user.id,
                post: post._id,
              });
              const savedComm=await newComment.save();
              await user.comments.push(savedComm._id);
              await post.comments.push(savedComm._id);
              await user.save();
              await post.save();
              res.status(200).json({ newComment });
            } else {
              res.status(404).json("there is no post with this id");
            }
          })
          .catch((err) => {
            res.status(404).json(err);
          });
      } else {
        res.status(404).json("there is no user with this id");
      }
    });
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports={createComment}