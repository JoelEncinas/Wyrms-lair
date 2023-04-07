const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authJWT.js");

router.get("/", verifyToken, function (req, res) {
  if (!user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user == "admin") {
    res.status(200).send({
      message: "Congratulations! but there is no hidden content",
    });
  } else {
    res.status(403).send({
      message: "Unauthorised access",
    });
  }
});

module.exports = router;
