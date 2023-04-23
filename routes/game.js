const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Character = require("../models/Character");

const router = express.Router();

// game route
router.get("/", (req, res) => {
  // Verify JWT token from cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect("/auth/login");
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).redirect("/auth/login");
    }

    const user = await User.findOne({ _id: decoded.userId });
    const character = await Character.findOne({ user: decoded.userId });
    res.status(200).render("game", { user: user, character: character });
  });
});

// TODO
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).render("login", { username_not_found: true });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      res.cookie("token", token);
      return res.redirect("/game");
    } else {
      return res.status(200).render("login", { invalid_credentials: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
