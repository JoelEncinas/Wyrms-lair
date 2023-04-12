// Wyrm's Lair

import { Player } from "./objects/Player.js";
import { HealingPotion } from "./objects/HealingPotion.js";
import { Location } from "./objects/Location.js";

// character stats
const hpText = document.getElementById("hit-points");
const goldText = document.getElementById("gold");
const experienceText = document.getElementById("experience");
const levelText = document.getElementById("level");

var player = new Player(10, 10, 20, 0, 1);

// location
var home = new Location(1, "Home", "This is your house.");

// potion
var potion = new HealingPotion(
  1,
  "minor healing potion",
  "minor healing potions",
  25
);

home.itemToEnter = potion;

console.log(home);

// set character stats
hpText.innerText = player.currentHitpoints;
goldText.innerText = player.gold;
experienceText.innerText = player.experience;
levelText.innerText = player.level;
