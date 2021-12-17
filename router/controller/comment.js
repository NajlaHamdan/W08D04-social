const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
// creaate comment after login 
const createComment = async (req, res) => {
  try {
    const { id, postId, desc } = req.body;
    await userModel.findById(id).then(async (user) => {
      if (user) {
        await postModel
          .findOne({ _id: postId })
          .then(async (post) => {
            if (post) {
              const newComment = new commentModel({
                desc,
                owner: user.id,
                post: post._id,
              });
              const savedComm = await newComment.save();
              // await user.comments.push(savedComm._id);
              await post.comments.push(savedComm._id);
              await user.save();
              await post.save();
              res.status(200).json( newComment );
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
//get specific comment by id
const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result= await commentModel.find({post:id})
      if (result.length) {
        res.status("200").json(result);
      } else {
        res.status("200").json("there is no comment with this id");
      }
  //   });
  } 
  catch (err) {
    res.status("200").json(err);
  }
};
//soft delete for specific comment by user that own the comment
const SoftDelComment = async (req, res) => {
  try {
    const { id, commentId } = req.body;
    await commentModel
      .findOne({ owner: id })
      .then(async (result) => {
        if (result) {
          await commentModel
            .findByIdAndUpdate({ _id: commentId }, { isDelete: true })
            .then((result) => {
              if (result) {
                res.status("200").json(result);
              } else {
                res.status("404").json("no comment with this id");
              }
            });
        } else {
          res.status("404").json("can not access this comment");
        }
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};
//udate comment by id by the user that own the comment
const updateComment = async (req, res) => {
  try {
    const { id, commentId, desc } = req.body;
    await commentModel
      .findOne({ owner: id })
      .then(async (result) => {
        if (result) {
          await commentModel
            .findByIdAndUpdate({ _id: commentId }, { desc })
            .then((result) => {
              if (result) {
                res.status("200").json(result);
              } else {
                res.status("404").json("no comment with this id");
              }
            });
        } else {
          res.status("404").json("can not access this comment");
        }
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};
//delete comment by id by the user that own the comment
const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    await commentModel
      .findOne({ owner: id })
      .then(async (user) => {
        if (user) {
          await commentModel.deleteOne({ _id: commentId }).then((result) => {
            if (result.deletedCount != 0) {
              res.status("200").json(result);
            } else {
              res.status("404").json("already deleted");
            }
          });
        } else {
          res.status("404").json("can not access this comment");
        }
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};
//for admin
const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    commentModel.deleteOne({ _id: id }).then(async (result) => {
      if (result.deletedCount != 0) {
        console.log(result);
        res.status("200").json(result);
      } else {
        res.status("200").json("no comment with this id");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
//export functions to use it in routes
module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  SoftDelComment,
  deleteCommentById,
};
