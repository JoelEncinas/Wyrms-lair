const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Character = require("../models/Character");

const router = express.Router();

// game route
router.get("/", (req, res) => {
  try {
    // Verify JWT token from cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).redirect("/auth/login");
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).redirect("/auth/login");
      }

      const saveGame = req.cookies.save_game;
      let renderSaveMessage = false;
      if (saveGame) {
        // Clear cookie
        res.cookie("save_game", null, { maxAge: 0 });
        renderSaveMessage = true;
      }

      const user = await User.findOne({ _id: decoded.userId });
      const character = await Character.findOne({ user: decoded.userId });

      res
        .status(200)
        .render("game", {
          user: user,
          character: character,
          saved_game: renderSaveMessage === true ? true : false,
        });
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO
router.post("/save", async (req, res) => {
  try {
    const userData = JSON.parse(req.body.userData);
    const characterData = JSON.parse(req.body.characterData);
    console.log(userData);
    console.log(characterData);
    res.cookie("save_game", "true");
    return res.status(201).redirect("/game");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;