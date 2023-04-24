const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { User } = require("../models");
module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log("Start:", name, email, password);
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        res.status(400);
        res.json({
          message: "User Already exists",
        });
      } else {
        const salt = await bcrypt.genSaltSync(10);
        let hashPassword = await bcrypt.hash(password, salt);
        if (hashPassword) {
          const newUser = await User.create({
            name,
            email,
            password: hashPassword,
          });
          if (newUser) {
            console.log(newUser.dataValues.id);
            res.json({
              name: name,
              email: email,
              token: generateToken(newUser.dataValues.id),
            });
          }
        }
      }
    } catch (error) {
      console.log("trycatch error :", error.message);
    }
  }),
  authUser: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.dataValues.password))) {
        res.json({
          name: user.dataValues.name,
          email: user.dataValues.email,
          token: generateToken(user.dataValues.id),
        });
      } else {
        if (!user) {
          res.status(403);
          res.json({
            message: "User does not exist!!!",
          });
        }
        res.status(400);
        res.json({
          message: "Password Incorrect!!!",
        });
      }
    } catch (error) {
      console.log("trycatch error :", error.message);
    }
  }),
};
