const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MLUser",
    required: true,
  },
  currentHitPoints: {
    type: Number,
    required: true,
  },
  maximumHitPoints: {
    type: Number,
    required: true,
  },
  gold: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  inventory: {
    type: mongoose.Schema.Types.Mixed,
  },
  level: {
    type: Number,
    required: true,
  },
  quests: {
    type: mongoose.Schema.Types.Mixed,
  },
  currentLocation: {
    type: Number,
    required: true,
  },
  currentWeapon: {
    type: Number,
    required: true,
  },
  currentPotion: {
    type: Number,
    required: true,
  },
  currentScroll: {
    type: Number,
    required: true,
  },
  hasSlayWyrm: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("WLCharacter", characterSchema);
