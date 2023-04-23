const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateToken");
const { User } = require("../models");
module.exports = {
  selectUser: asyncHandler(async (req, res) => {
    User.findAll({ where: { firstName: "Bibin", lastName: "Mathew" } })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }),
  insertUser: asyncHandler(async (req, res) => {
    User.create({
      firstName: "Bibin",
      lastName: "Mathew",
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send("Inserted");
  }),
  deleteUser: asyncHandler(async (req, res) => {
    User.destroy({ where: { id: 1 } });
    res.send("deleted");
  }),
};
