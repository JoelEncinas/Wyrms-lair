const express = require("express");
const jwt = require("jsonwebtoken");
const Character = require("../models/Character");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return notAuthorized();
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return notAuthorized();
      }

      const saveGame = req.cookies.save_game;
      let renderSaveMessage = false;
      if (saveGame) {
        res.cookie("save_game", null, { maxAge: 0 });
        renderSaveMessage = true;
      }

      const character = await Character.findOne({
        user: decoded.userId,
      });

      res.status(200).render("game", {
        character: character,
        saved_game: renderSaveMessage === true ? true : false,
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO
router.get("/save", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return notAuthorized();
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return notAuthorized();
      }

      const character = await Character.findOne({
        user: decoded.userId,
      });

      res.status(200).json(character);
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO
router.post("/save", async (req, res) => {
  try {
    const {
      currentHitPoints,
      maximumHitPoints,
      gold,
      experience,
      inventory,
      level,
      quests,
      currentLocation,
      currentWeapon,
      currentPotion,
      currentScroll,
    } = req.body;

    const token = req.cookies.token;
    if (!token) {
      return notAuthorized();
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return notAuthorized();
      }

      await Character.findOneAndUpdate(
        { user: decoded.userId },
        {
          currentHitPoints: currentHitPoints,
          maximumHitPoints: maximumHitPoints,
          gold: gold,
          experience: experience,
          inventory: JSON.parse(inventory),
          level: level,
          quests: JSON.parse(quests),
          currentLocation: currentLocation,
          currentWeapon: currentWeapon,
          currentPotion: currentPotion,
          currentScroll: currentScroll,
        }
      );

      res.cookie("save_game", "true");
      return res.status(201).redirect("/game");
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function notAuthorized() {
  return res.status(401).redirect("/auth/login");
}

module.exports = router;
