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
    type: [{
      id: Number,
      quantity: Number
    }],
  },
  level: {
    type: Number,
    required: true,
  },
  quests: {
    type: [String],
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
});

module.exports = mongoose.model("WLCharacter", characterSchema);
