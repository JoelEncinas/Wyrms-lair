const express = require("express");
const router = express.Router();
const { signup, signin } = require("./../controllers/authController.js");

router.post("/register", signup, function (req, res) {});

router.post("/login", signin, function (req, res) {});

module.exports = router;
