const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// game route
router.get("/", (req, res) => {
  // Verify JWT token from cookie
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/auth/login");
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.redirect("/auth/login");
    }

    const user = await User.findOne({ _id: decoded.userId });
    res.status(200).render("game", { username: user.username });
  });
});

module.exports = router;
