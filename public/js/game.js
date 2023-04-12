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

// log
const logDisplay = document.getElementById("log-display");

// character movement
const northBtn = document.getElementById("north");
const eastBtn = document.getElementById("east");
const southBtn = document.getElementById("south");
const westBtn = document.getElementById("west");

// default
let player = new Player(10, 10, 20, 0, 1, locationByID(LOCATION_IDS.HOME));
player.Inventory.push(new InventoryItem(itemByID(ITEM_IDS.RUSTY_SWORD), 1));

// set character stats
hpText.innerText = `${player.CurrentHitpoints} / ${player.MaximumHitpoints}`;
goldText.innerText = player.Gold;
experienceText.innerText = player.Experience;
levelText.innerText = player.Level;

console.log(player);

function moveTo(newLocation) {
  //Does the location have any required items
  if (newLocation.ItemToEnter !== undefined) {
    // See if the player has the required item in their inventory
    let playerHasRequiredItem = false;

    for (let ii of player.Inventory) {
      if (ii.Details.ID === newLocation.ItemToEnter.ID) {
        // We found the required item
        playerHasRequiredItem = true;
        break; // Exit out of the loop
      }
    }

    if (!playerHasRequiredItem) {
      // We didn't find the required item in their inventory, so display a message and stop trying to move
      logDisplay =
        logDisplay.innerHTML +
        "You must have a " +
        newLocation.ItemToEnter +
        " to enter this location.";
      return;
    }
  }

  // Update the player's current location
  player.CurrentLocation = newLocation;
}

// location btns
northBtn.addEventListener("click", function (e) {
  moveTo(player.CurrentLocation.LocationToNorth);
});

eastBtn.addEventListener("click", function (e) {
  moveTo(player.CurrentLocation.LocationToEast);
});

southBtn.addEventListener("click", function (e) {
  moveTo(player.CurrentLocation.LocationToSouth);
});

westBtn.addEventListener("click", function (e) {
  moveTo(player.CurrentLocation.LocationToWest);
});
