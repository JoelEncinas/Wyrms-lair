const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Character = require("../models/Character");

const router = express.Router();

router.get("/register", (req, res) => {
  res.status(200).render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).render("register", { existing_user: true });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const newCharacter = new Character({
      user: newUser._id,
      currentHitPoints: 40,
      maximumHitPoints: 40,
      gold: 0,
      experience: 0,
      level: 1,
      currentLocation: 1,
      currentWeapon: 1,
      currentPotion: 1,
      currentScroll: 1
    });
    await newCharacter.save();

    res.status(201).redirect("/auth/login");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
router.get("/login", (req, res) => {
  res.status(200).render("login");
});

// Log in an existing user
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
      return res.status(200).redirect("/game");
    } else {
      return res.status(200).render("login", { invalid_credentials: true });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  // Clear JWT token cookie
  res.clearCookie("token");
  res.status(200).redirect("/auth/login");
});

module.exports = router;
