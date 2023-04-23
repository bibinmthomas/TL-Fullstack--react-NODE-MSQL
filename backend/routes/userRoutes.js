const express = require("express");
const router = express.Router();
const {
  selectUser,
  insertUser,
  deleteUser,
} = require("../controllers/userControllers");

router.route("/select").get(selectUser);

router.route("/insert").get(insertUser);

router.route("/delete").get(deleteUser);

module.exports = router;
