// Wyrm's Lair

import { Player } from "./objects/Player.js";
import { InventoryItem } from "./objects/InventoryItem.js";
import {
  items,
  monsters,
  quests,
  locations,
  itemByID,
  monsterByID,
  questByID,
  locationByID,
  ITEM_IDS,
  MONSTER_IDS,
  QUEST_IDS,
  LOCATION_IDS,
} from "./world.js";

import { randomNumberGenerator } from "./utils/RandomNumberGenerator.js";

// UI
// character stats
const hpText = document.getElementById("hit-points");
const goldText = document.getElementById("gold");
const experienceText = document.getElementById("experience");
const levelText = document.getElementById("level");

// character movement
const northBtn = document.getElementById("north");
const eastBtn = document.getElementById("east");
const southBtn = document.getElementById("south");
const westBtn = document.getElementById("west");

// default
const player = new Player(10, 10, 20, 0, 1);
player.Inventory.push(new InventoryItem(itemByID(ITEM_IDS.RUSTY_SWORD), 1));

// set character stats
hpText.innerText = `${player.CurrentHitpoints} / ${player.MaximumHitpoints}`;
goldText.innerText = player.Gold;
experienceText.innerText = player.Experience;
levelText.innerText = player.Level;

console.log(player);
