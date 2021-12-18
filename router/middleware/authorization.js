const roleModel = require("./../../db/models/role");
const authorization = async (req, res, next) => {
  try {
    const roleId = req.tocken.role;
    const result = await roleModel.findById(roleId);
    console.log(result);
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
