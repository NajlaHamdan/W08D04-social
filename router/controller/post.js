const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
//create post after log in
const createPost = async (req, res) => {
  try {
    const { img, desc, id } = req.body;
    const newPost = new postModel({
      img,
      desc,
    });
    await userModel.findById(id).then(async (result) => {
      if (result) {
        console.log(result);
        newPost.owner = result._id;
        await result.posts.push(newPost);
        await result.save();
        await newPost.save();
        console.log("owner", newPost.owner);
        console.log(result.posts);
        res.status(200).json(result.posts);
      } else {
        res.status("404").json("no user with this id");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
//get posts for one user by id
const getPosts = (req, res) => {
  try {
    //id for the user
    const { id } = req.params;
    //find user to get his posts
    userModel
      .findById(id)
      .then(async (result) => {
        if (result) {
          console.log(result);
          // find posts for the user and save it in array todos
          const posts = await postModel.find({ owner: id });
          if (posts.length) {
            //store posts name in array to display it in res
            const postsName = [];
            posts.forEach((item) => {
              postsName.push(item.desc);
            });
            res.status("200").json(posts);
          } else {
            res.status("404").json("no todos for this user");
          }
        } else {
          res.status("404").json("no user with this id");
        }
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};
//udate post by id by the user that own the post
const updateById = async (req, res) => {
  try {
    const { desc, id, postId } = req.body;
    //find user
    await postModel.findOne({ owner: id }).then(async (result) => {
      if (result) {
        const post = await postModel.findByIdAndUpdate(postId, { desc });
        if (post) {
          console.log(post);
          await post.save();
          res.status("200").json(post);
        } else {
          res.status("404").json("there is no post with this id");
        }
      } else {
        res.status("404").json("can not access this post");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
//soft delete by the user that own the comment
const SoftDelPost = async (req, res) => {
  try {
    const { id, postId } = req.body;
    await postModel
      .findOne({ owner: id })
      .then(async (result) => {
        if (result) {
          await postModel
            .findByIdAndUpdate({ _id: postId }, { isDelete: true })
            .then((result) => {
              if (result) {
                res.status("200").json(result);
              } else {
                res.status("404").json("no post with this id");
              }
            });
        } else {
          res.status("404").json("can not access this post");
        }
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } catch (err) {
    res.status("404").json(err);
  }
};
//delete post by the user that own the post
const deletePost = async (req, res) => {
  try {
    const { id, todoId } = req.params;
    await userModel.findById(id).then(async (result) => {
      if (result) {
        await postModel.findOne({ owner: id }).then(async (result) => {
          if (result) {
            await postModel.deleteOne({ _id: todoId }).then((result) => {
              if (result.deletedCount != 0) {
                res.status("200").json(result);
              } else {
                res.status("404").json("already deleted");
              }
            });
          } else {
            res.status("404").json("this user does not have posts");
          }
        });
      } else {
        res.status("404").json("no user with this id");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
//for admin
const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    postModel.deleteOne({ _id: id }).then(async (result) => {
      if (result.deletedCount != 0) {
        console.log(result);
        res.status("200").json(result);
      } else {
        res.status("404").json("no posts");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
module.exports = {
  createPost,
  getPosts,
  updateById,
  deletePost,
  SoftDelPost,
  deletePostById,
};
