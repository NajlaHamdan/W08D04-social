const roleModel = require("./../../db/models/role");
const createRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });
  newRole
    .save()
    .then((result) => {
      res.status("201").json(result);
    })
    .catch((err) => {
      res.status("404").json(err);
    });
};
const getRole = (req, res) => {
  roleModel
    .find({})
    .then((result) => res.status("200").json(result))
    .catch((err) => res.status("200").json(err));
};

module.exports = { createRole, getRole };
