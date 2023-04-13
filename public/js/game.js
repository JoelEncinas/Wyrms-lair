// Wyrm's Lair

import { HealingPotion } from "./objects/HealingPotion.js";
import { InventoryItem } from "./objects/InventoryItem.js";
import { Item } from "./objects/Item.js";
import { LivingCreature } from "./objects/LivingCreature.js";
import { Location } from "./objects/Location.js";
import { LootItem } from "./objects/LootItem.js";
import { Monster } from "./objects/Monster.js";
import { Player } from "./objects/Player.js";
import { PlayerQuest } from "./objects/PlayerQuest.js";
import { Quest } from "./objects/Quest.js";
import { QuestCompletionItem } from "./objects/QuestCompletionItem.js";
import { Weapon } from "./objects/Weapon.js";

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

// character actions
const weaponBtn = document.getElementById("weapon-btn");
const potionBtn = document.getElementById("potion-btn");

// default
let currentMonster;
let player = new Player(10, 10, 20, 0, 1, locationByID(LOCATION_IDS.HOME));
player.Inventory.push(new InventoryItem(itemByID(ITEM_IDS.RUSTY_SWORD), 1));

locationName.innerText = player.CurrentLocation.Name;
locationDescription.innerText = player.CurrentLocation.Description;

updateButtonClass(northBtn, player.CurrentLocation.LocationToNorth);
updateButtonClass(eastBtn, player.CurrentLocation.LocationToEast);
updateButtonClass(southBtn, player.CurrentLocation.LocationToSouth);
updateButtonClass(westBtn, player.CurrentLocation.LocationToWest);

// set character stats
hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;
goldText.innerText = player.Gold;
experienceText.innerText = player.Experience;
levelText.innerText = player.Level;

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

// action btns
weaponBtn.addEventListener("click", function (e) {
  // TODO
});

potionBtn.addEventListener("click", function (e) {
  // TODO
});

function updateButtonClass(button, location) {
  if (location !== undefined) {
    if (button.classList.length > 0) {
      [...button.classList].forEach((className) => {
        if (className === "d-none") {
          button.classList.remove("d-none");
        }
      });
    }
    button.classList.add("d-block");
  } else {
    button.classList.add("d-none");
    if (button.classList.length > 0) {
      [...button.classList].forEach((className) => {
        if (className === "d-block") {
          button.classList.remove("d-block");
        }
      });
    }
  }
}

function showButton(button) {
  if (button.classList.length > 0) {
    [...button.classList].forEach((className) => {
      if (className === "d-none") {
        button.classList.remove("d-none");
      }
    });
  }
  button.classList.add("d-block");
}

function hideButton(button) {
  if (button.classList.length > 0) {
    [...button.classList].forEach((className) => {
      if (className === "d-block") {
        button.classList.remove("d-block");
      }
    });
  }
  button.classList.add("d-none");
}

function updatePlayerStats(
  player,
  hpText,
  goldText,
  experienceText,
  levelText
) {
  hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;
  goldText.innerText = player.Gold;
  experienceText.innerText = player.Experience;
  levelText.innerText = player.Level;
}

function addLine(text) {
  const newLine = document.createElement("p");
  newLine.textContent = text;
  logDisplay.appendChild(newLine);
  logDisplay.scrollTop = logDisplay.scrollHeight;
}

function moveTo(newLocation) {
  console.log(player);

  if (!player.hasRequiredItemToEnter(newLocation)) {
    addLine(
      "You must have a " +
        newLocation.ItemToEnter.Name +
        " to enter this location."
    );

    return;
  }

  // Update the player's current location
  player.CurrentLocation = newLocation;

  // update location UI
  locationName.innerText = player.CurrentLocation.Name;
  locationDescription.innerText = player.CurrentLocation.Description;

  // Show/hide available movement buttons
  updateButtonClass(northBtn, newLocation.LocationToNorth);
  updateButtonClass(eastBtn, newLocation.LocationToEast);
  updateButtonClass(southBtn, newLocation.LocationToSouth);
  updateButtonClass(westBtn, newLocation.LocationToWest);

  // Completely heal the player
  player.CurrentHitPoints = player.MaximumHitPoints;

  updatePlayerStats(player, hpText, goldText, experienceText, levelText);

  // Does the location have a quest?
  if (newLocation.QuestAvailableHere !== undefined) {
    // See if the player already has the quest, and if they've completed it
    let playerAlreadyHasQuest = player.hasThisQuest(
      newLocation.QuestAvailableHere
    );
    let playerAlreadyCompletedQuest = player.hasCompletedThisQuest(
      newLocation.QuestAvailableHere
    );

    // See if the player already has the quest
    if (playerAlreadyHasQuest) {
      // If the player has not completed the quest yet
      if (!playerAlreadyCompletedQuest) {
        let playerHasAllItemsToCompleteQuest =
          player.HasAllQuestCompletionItems(newLocation.QuestAvailableHere);

        // The player has all items required to complete the quest
        if (playerHasAllItemsToCompleteQuest) {
          // Display message
          addLine(
            "You complete the '" +
              newLocation.QuestAvailableHere.Name +
              "' quest."
          );

          // Remove quest items from inventory
          player.RemoveQuestCompletionItems(newLocation.QuestAvailableHere);

          // Give quest rewards
          addLine("You receive: ");
          addLine(
            newLocation.QuestAvailableHere.RewardExperiencePoints.ToString() +
              " experience points."
          );
          addLine(
            newLocation.QuestAvailableHere.RewardGold.ToString() + " gold."
          );
          addLine(newLocation.QuestAvailableHere.RewardItem.Name + " .");
          addLine("");

          player.ExperiencePoints +=
            newLocation.QuestAvailableHere.RewardExperiencePoints;
          player.Gold += newLocation.QuestAvailableHere.RewardGold;

          // Add the reward item to the player's inventory
          player.AddItemToInventory(newLocation.QuestAvailableHere.RewardItem);

          // Mark the quest as completed
          player.MarkQuestCompleted(newLocation.QuestAvailableHere);
        }
      }
    } else {
      // The player does not already have the quest

      // Display the messages
      addLine(
        "You receive the " + newLocation.QuestAvailableHere.Name + " quest."
      );
      addLine(newLocation.QuestAvailableHere.Description);
      addLine("To complete it, return with:");

      // Iterate through the quest completion items
      for (let qci of newLocation.QuestAvailableHere.QuestCompletionItems) {
        if (qci.Quantity === 1) {
          addLine("- " + qci.Quantity.toString() + " " + qci.Details.Name);
        } else {
          addLine(
            "- " + qci.Quantity.toString() + " " + qci.Details.NamePlural
          );
        }
      }

      // Add the quest to the player's quest list
      player.Quests.push(new PlayerQuest(newLocation.QuestAvailableHere));
    }
  }
  // Does the location have a monster?
  if (newLocation.MonsterLivingHere !== undefined) {
    addLine("You see a " + newLocation.MonsterLivingHere.Name);

    // Make a new monster, using the values from the standard monster in the World.Monster list
    let standardMonster = monsterByID(newLocation.MonsterLivingHere.ID);

    currentMonster = new Monster(
      standardMonster.ID,
      standardMonster.Name,
      standardMonster.MaximumDamage,
      standardMonster.RewardExperiencePoints,
      standardMonster.RewardGold,
      standardMonster.CurrentHitPoints,
      standardMonster.MaximumHitPoints
    );

    // Iterate through the loot items
    currentMonster.LootTable.push(
      ...standardMonster.LootTable.map((lootItem) => ({ ...lootItem }))
    );

    // TODO - hide and show everything not only buttons
    showButton(weaponBtn);
    showButton(potionBtn);
  } else {
    currentMonster = null;

    hideButton(weaponBtn);
    hideButton(potionBtn);
  }

  // TODO
  // Refresh player's inventory list

  // TODO
  // Refresh player's quest list

  // TODO
  // Refresh player's weapons combobox

  // TODO
  // Refresh player's potions combobox
  console.log(player);
}
