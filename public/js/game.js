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
let hpText = document.getElementById("hit-points");
let goldText = document.getElementById("gold");
let experienceText = document.getElementById("experience");
let levelText = document.getElementById("level");

// location
let locationName = document.getElementById("location-name");
let locationDescription = document.getElementById("location-description");

// log
let logDisplay = document.getElementById("log-display");

// character movement
const northBtn = document.getElementById("north");
const eastBtn = document.getElementById("east");
const southBtn = document.getElementById("south");
const westBtn = document.getElementById("west");

// default
let player = new Player(10, 10, 20, 0, 1, locationByID(LOCATION_IDS.HOME));
player.Inventory.push(new InventoryItem(itemByID(ITEM_IDS.RUSTY_SWORD), 1));

locationName.innerText = player.CurrentLocation.Name;
locationDescription.innerText = player.CurrentLocation.Description;

updateButtonClass(northBtn, player.CurrentLocation.LocationToNorth);
updateButtonClass(eastBtn, player.CurrentLocation.LocationToEast);
updateButtonClass(southBtn, player.CurrentLocation.LocationToSouth);
updateButtonClass(westBtn, player.CurrentLocation.LocationToWest);

// set character stats
hpText.innerText = `${player.CurrentHitpoints} / ${player.MaximumHitpoints}`;
goldText.innerText = player.Gold;
experienceText.innerText = player.Experience;
levelText.innerText = player.Level;

console.log(player);

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
      // TODO
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
  console.log(player);

  // update location UI
  locationName.innerText = player.CurrentLocation.Name;
  locationDescription.innerText = player.CurrentLocation.Description;

  // Show/hide available movement buttons
  updateButtonClass(northBtn, newLocation.LocationToNorth);
  updateButtonClass(eastBtn, newLocation.LocationToEast);
  updateButtonClass(southBtn, newLocation.LocationToSouth);
  updateButtonClass(westBtn, newLocation.LocationToWest);
}

function updateButtonClass(button, location) {
  if (location !== undefined) {
    button.classList.remove("d-none");
    button.classList.add("d-block");
  } else {
    button.classList.add("d-none");
    button.classList.remove("d-block");
  }
}
