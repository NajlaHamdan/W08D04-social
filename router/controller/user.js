const userModel = require("./../../db/models/user");
const postModel = require("./../../db/models/post");
const commentModel = require("./../../db/models/comment");
//require("dotenv").config();//already has configed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
const salt = Number(process.env.SALT);
const secret = process.env.SECRET;
const user = new OAuth2Client(
  "389990397434-ap6i1btg0ubfc79meg74hrt23msjf8ua.apps.googleusercontent.com"
);
const sendEmail = async ({ email }, res) => {
  // const {email}=req.body;
  rand = Math.floor(Math.random() * 100000 + 100000);
  // console.log(process.env.EMAIL);
  // console.log(process.env.PASS);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "verified your email",
    text: `hello`,
    html: `<h1> hello  </h1> to verified your account take this code ${rand}`,
  };
  await transporter.sendMail(message, (err, result) => {
    if (err) {
      console.log("there is error in sending message", err);
      // res.status("404").json(err);
    } else {
      console.log("message sending succesfully ");
      //res.status(200).json({message:result});
      userModel.findOne({ email }).then(async (result) => {
        if (result) {
          if (result.email == email) {
            userModel
              .findByIdAndUpdate(result._id, { code: rand })
              .then(async (result) => {
                if (result) {
                  await result.save();
                  // res.status(200).json({message:result});
                } else {
                  console.log("there is error in sending message");
                  res.status("404").json(err);
                }
              });
          }
        }
      });
    }
  });
};
const checkCode = async (req, res) => {
  const { email, code } = req.body;
  const result = await userModel.findOne({ $and: [ email , { code }] });
  if (result) {
    if (result.code == code) {
      const response = await userModel.findByIdAndUpdate(result._id, {
        verified: true,
      });
      await response.save();
      res.status(200).json(true);
      // return true
    }
  } else {
    res.status(200).json(false);
  }
};
const googleSignIn = async (req, res) => {
  // tokenId come from response object in the front end
  const { token } = req.body;
  // console.log(token);
  const response = await user.verifyIdToken({
    idToken: token,
    audience:
      "389990397434-ap6i1btg0ubfc79meg74hrt23msjf8ua.apps.googleusercontent.com",
  });
  // console.log(response.payload);
  if (response) {
    const { email_verified, name, email } = response.payload;
    console.log(email_verified);
    if (email_verified) {
      // here we have two cases
      //  1-this is the first time to login by google => we have to create user in database
      //  2-this is second time to login with google => we have to check if the user found in our database and generate token
      userModel
        .findOne({ email })
        .then(async (result) => {
          if (result) {
            console.log("wehfweihfewhfehrferhgehg");
            if (result.email == email) {
              console.log(result.email);
              const payload = {
                role: result.role,
              };
              const options = {
                expiresIn: "60m",
              };
              const token = await jwt.sign(payload, secret, options);
              console.log(token);
              const decrybtedName = await bcrypt.compare(name, result.userName);
              if (decrybtedName) {
                res.status("200").json({ result, token });
              } else {
                console.log("hi hkhukhkuk");
                res.status("404").json("email or username is not valid");
              }
            } else {
              res.status("404").json("email or username is not valid");
            }
          } else {
            res.status(404).json("something wrong occured !!");
          }
        })
        .catch(async (err) => {
          //here the second case create user
          //random password because password required in our database
          let password = name + email + salt;
          const hashedName = await bcrypt.hash(name, salt);
          const newUser = new userModel({
            userName: hashedName,
            email,
            password,
          });
          await newUser.save();
          res.status(200).json(newUser);
          console.log("here normally");
          // res.status(404).json(err);
        });
    }
  }

  // res.status(404).json("somethingWrong");
};
const googleSignOut = () => {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
};
const checkPass = (password) => {
  const strong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  return strong.test(password) ? true : false;
};
const forgetPassword = (req, res) => {
  const { email, password, confirmPass } = req.body;
  // sendEmail(email);
  // if(checkCode){console.log("true");}
  userModel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (password == confirmPass) {
          if (checkPass(password)) {
            const hashed = await bcrypt.hash(password, salt);
            await userModel.updateOne({ email }, { password:hashed });
            res.status(200).json(true);
          } else {
            res.status(200).json("weak password");
          }
        } else {
          res.status(200).json("password does not match confirm password !!");
        }
      } else {
        res.status(200).json("does not have account !!");
      }
    })
    .catch((err) => res.status(404).json(err));
};
const register = async (req, res) => {
  const { email, password, userName } = req.body;
  //strong
  //{ "email":"ain@ee.com", "password":"najLa1@2","userName":"Najla", "role":"61ac96f1bc01bd4bd3a4f039" }
  if (checkPass(password)) {
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      role:"61a75918e9839777023d716d",
      email,
      userName,
      password: hashed,
    });
    newUser
      .save()
      .then((result) => {
        sendEmail(result);
        res.status("201").json(result);
      })
      .catch((err) => {
        res.status("404").json(err);
      });
  } else {
    res.status(404).json("weak password");
  }
};
const login = (req, res) => {
  const { emailORuserName, password } = req.body;
  userModel
    .findOne({
      $or: [{ email: emailORuserName }, { userName: emailORuserName }],
    }) //with find will return email and say not valid if it is valid
    .then(async (result) => {
      if (result) {
        console.log(result);
        if (result.verified) {
          console.log(result.email);
          const payload = {
            role: result.role,
          };
          const options = {
            expiresIn: "60m",
          };
          const token = await jwt.sign(payload, secret, options);
          console.log(token, "--", result.userName);
          // res.status(200).json(result);
          console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
          const decrybtedPass = await bcrypt.compare(password, result.password);
          if (decrybtedPass) {
            res.status("200").json({ result, token });
          } else {
            //   console.log("hi");
            res.status("404").json("email or username is not valid");
          }
        } else {
          //   // console.log("hi");
          //   res.status("404").json("email or password is not valid");
          // }else {
          res.status(404).json("your account is not verified !!"); /////
        }
      } else {
        res.status("404").json("does not exist");
      }
    })
    .catch((err) => res.status("404").json(err));
};
//for admin
const getAllUsers = async (req, res) => {
  try {
    userModel.find({}).then(async (result) => {
      if (result) {
        console.log(result);
        res.status("200").json(result);
      } else {
        res.status("404").json("no users");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
const removeAllUsers = async (req, res) => {
  try {
    userModel.remove({}).then(async (result) => {
      if (result.deletedCount != 0) {
        console.log(result);
        res.status("200").json(result);
      } else {
        res.status("404").json("no users");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
const deletePosts = async (req, res) => {
  try {
    // find user to get his todos
    postModel.remove({}).then(async (result) => {
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
const deleteComments = async (req, res) => {
  try {
    // find user to get his todos
    commentModel.remove({}).then(async (result) => {
      if (result.deletedCount != 0) {
        console.log(result);
        res.status("200").json(result);
      } else {
        res.status("404").json("no comments");
      }
    });
  } catch (err) {
    res.status("404").json(err);
  }
};
module.exports = {
  register,
  login,
  getAllUsers,
  removeAllUsers,
  deletePosts,
  deleteComments,
  forgetPassword,
  googleSignIn,
  checkCode,
};
