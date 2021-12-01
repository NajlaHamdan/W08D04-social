const roleModel = require("./../../db/models/role");
const authorization = async (req, res, next) => {
  try {
    const roleId = req.token.role;
    const result = await roleModel.findById(roleId);
    if (result.role === "admin") {
      next();
    } else {
      res.status("404").json(err);
    }
  } catch (err) {
    res.status("404").json(err);
  }
};
module.exports = authorization;
