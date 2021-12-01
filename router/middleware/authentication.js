const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status("403").json("forbidden");
    }
    const tocken = req.headers.authorization.split(" ")[1];
    const parsed = jwt.verify.findById(tocken, secret);
    req.tocken = parsed;
    next();
  } catch (err) {
    res.status("404").json(err);
  }
};
module.exports = authentication;
