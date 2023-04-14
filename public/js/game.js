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

// inventory
const inventoryContainer = document.getElementById("inventory");

// log
let logDisplay = document.getElementById("log-display");

// character movement
const northBtn = document.getElementById("north");
const eastBtn = document.getElementById("east");
const southBtn = document.getElementById("south");
const westBtn = document.getElementById("west");

// quests
const questsContainer = document.getElementById("quests");

// character actions
const weaponBtn = document.getElementById("weapon-btn");
const weaponOptions = document.getElementById("weapon-options");
const potionBtn = document.getElementById("potion-btn");
const potionOptions = document.getElementById("potion-options");

// FIRST LOAD
let currentMonster;
let player = new Player(
  10,
  10,
  20,
  0,
  1,
  locationByID(LOCATION_IDS.HOME),
  itemByID(ITEM_IDS.RUSTY_SWORD)
);

player.AddItemToInventory(itemByID(ITEM_IDS.RUSTY_SWORD));
player.AddItemToInventory(itemByID(ITEM_IDS.KNIFE));
player.CurrentWeapon = ITEM_IDS.RUSTY_SWORD;

locationName.innerText = player.CurrentLocation.Name;
locationDescription.innerText = player.CurrentLocation.Description;

updateButtonClass(northBtn, player.CurrentLocation.LocationToNorth);
updateButtonClass(eastBtn, player.CurrentLocation.LocationToEast);
updateButtonClass(southBtn, player.CurrentLocation.LocationToSouth);
updateButtonClass(westBtn, player.CurrentLocation.LocationToWest);

updatePlayerStats(player, hpText, goldText, experienceText, levelText);

updateQuestsTable();
updateInventoryTable(player.Inventory);

updateWeaponListInUI();
hideElement(weaponBtn);
hideElement(weaponOptions);
hideElement(potionBtn);
hideElement(potionOptions);

console.log(player);

// current location global
let currentLocation = locationByID(LOCATION_IDS.HOME);

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

// action buttons
weaponBtn.addEventListener("click", function (e) {
  player.CurrentWeapon = parseInt(
    weaponOptions.options[weaponOptions.selectedIndex].value
  );

  let currentWeapon = itemByID(
    parseInt(weaponOptions.options[weaponOptions.selectedIndex].value)
  );

  let damageToMonster = randomNumberGenerator(
    currentWeapon.MinimumDamage,
    currentWeapon.MaximumDamage
  );

  currentMonster.CurrentHitPoints -= damageToMonster;

  addLine(
    "You hit the " +
      currentMonster.Name +
      " for " +
      damageToMonster +
      " points of damage."
  );

  if (currentMonster.CurrentHitPoints <= 0) {
    addLine("You defeated the " + currentMonster.Name + " .");

    player.Experience += currentMonster.RewardExperiencePoints;
    addLine(
      "You gain <span class='text-warning'>" +
        currentMonster.RewardExperiencePoints +
        "xp</span>."
    );

    player.Gold += currentMonster.RewardGold;
    addLine(
      "You loot <span class='text-warning'>" +
        currentMonster.RewardGold +
        " gold</span>."
    );

    const lootedItems = [];

    currentMonster.LootTable.forEach(function (itemLooted) {
      let randomNumber = Math.floor(Math.random() * 100) + 1;

      if (randomNumber <= itemLooted._DropPercentage) {
        lootedItems.push(new InventoryItem(itemLooted._Details, 1));
      }
    });

    if (lootedItems.length === 0) {
      currentMonster.LootTable.forEach(function (itemLooted) {
        if (itemLooted.IsDefaultItem) {
          lootedItems.push(new InventoryItem(itemLooted._Details, 1));
        }
      });
    }

    lootedItems.forEach(function (itemLooted) {
      player.AddItemToInventory(itemLooted.Details);

      if (itemLooted.Quantity === 1) {
        addLine(
          "You loot " + itemLooted.Quantity + " " + itemLooted.Details.Name
        );
      } else {
        addLine(
          "You loot " +
            itemLooted.Quantity +
            " " +
            itemLooted.Details.NamePlural
        );
      }
    });

    updatePlayerStats(player, hpText, goldText, experienceText, levelText);

    updateInventoryTable(player.Inventory);
    updateWeaponListInUI();
    updatePotionListInUI();

    spawnMonster(currentLocation);
    console.log(player.Inventory);
  } else {
    let damageToPlayer = randomNumberGenerator(0, currentMonster.MaximumDamage);

    addLine(
      "The " +
        currentMonster.Name +
        " did " +
        damageToPlayer +
        " points of damage"
    );

    player.CurrentHitPoints -= damageToPlayer;

    hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;

    if (player.CurrentHitPoints <= 0) {
      hpText.innerText = `0 / ${player.MaximumHitPoints}`;
      addLine("The " + currentMonster.Name + " killed you...");

      // TODO - permanent death?
      moveTo(locationByID(LOCATION_IDS.HOME));
      updateButtonClass(northBtn, currentLocation.LocationToNorth);
      updateButtonClass(eastBtn, currentLocation.LocationToEast);
      updateButtonClass(southBtn, currentLocation.LocationToSouth);
      updateButtonClass(westBtn, currentLocation.LocationToWest);
    }
  }
});

potionBtn.addEventListener("click", function (e) {
  let currentPotion = itemByID(
    parseInt(potionOptions.options[potionOptions.selectedIndex].value)
  );

  player.CurrentHitPoints +=
    player.CurrentHitPoints + currentPotion.AmountToHeal;

  if (player.CurrentHitPoints > player.MaximumHitPoints) {
    player.CurrentHitPoints = player.MaximumHitPoints;
  }

  player.Inventory.forEach(function (ii) {
    if (ii.Details.ID === currentPotion.ID) {
      ii.Quantity--;
      return;
    }
  });

  addLine("You drink a " + currentPotion.Name);

  let damageToPlayer = randomNumberGenerator(0, currentMonster.MaximumDamage);

  addLine(
    "The " +
      currentMonster.Name +
      " did " +
      damageToPlayer +
      " points of damage"
  );

  player.CurrentHitPoints -= damageToPlayer;

  hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;

  if (player.CurrentHitPoints <= 0) {
    hpText.innerText = `0 / ${player.MaximumHitPoints}`;
    addLine("The " + currentMonster.Name + " killed you...");

    // TODO - permanent death?
    moveTo(locationByID(LOCATION_IDS.HOME));
    updateButtonClass(northBtn, currentLocation.LocationToNorth);
    updateButtonClass(eastBtn, currentLocation.LocationToEast);
    updateButtonClass(southBtn, currentLocation.LocationToSouth);
    updateButtonClass(westBtn, currentLocation.LocationToWest);
  }

  updateInventoryTable(player.Inventory);
  updatePotionListInUI();
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

function showElement(element) {
  if (element.classList.length > 0) {
    [...element.classList].forEach((className) => {
      if (className === "d-none") {
        element.classList.remove("d-none");
      }
    });
  }
  element.classList.add("d-block");
}

function hideElement(element) {
  if (element.classList.length > 0) {
    [...element.classList].forEach((className) => {
      if (className === "d-block") {
        element.classList.remove("d-block");
      }
    });
  }
  element.classList.add("d-none");
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
  newLine.innerHTML = text;
  logDisplay.appendChild(newLine);
  logDisplay.scrollTop = logDisplay.scrollHeight;
}

function updateQuestsTable() {
  const questsTable = questsContainer.querySelector("table");
  questsTable.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    '<th scope="col">Name</th><th scope="col">Completed</th>';
  questsTable.appendChild(headerRow);

  for (const quest of player.Quests) {
    const questRow = document.createElement("tr");
    const checkBoxCell = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.className = "form-check-input";
    checkBox.type = "checkbox";
    checkBox.id = `flexCheck${quest.IsCompleted ? "Checked" : "Default"}`;
    checkBox.checked = quest.IsCompleted;
    checkBox.disabled = true;
    checkBoxCell.appendChild(checkBox);
    questRow.innerHTML = `<td>${quest.Details.Name}</td>`;
    questRow.appendChild(checkBoxCell);
    questsTable.appendChild(questRow);
  }
}

function updateInventoryTable(inventory) {
  const inventoryTable = inventoryContainer.querySelector("table");
  inventoryTable.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML =
    '<th scope="col">Name</th><th scope="col">Quantity</th>';
  inventoryTable.appendChild(headerRow);

  for (const item of inventory) {
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `<td>${item.Details.Name}</td><td>${item.Quantity}</td>`;
    inventoryTable.appendChild(itemRow);
  }
}

// TODO - keep the index of the user weapon
function updateWeaponListInUI() {
  var weapons = [];
  var inventory = player.Inventory;

  for (var i = 0; i < inventory.length; i++) {
    var inventoryItem = inventory[i];
    if (inventoryItem.Details instanceof Weapon) {
      if (inventoryItem.Quantity > 0) {
        weapons.push(inventoryItem.Details);
      }
    }
  }

  if (weapons.length === 0) {
    hideElement(weaponOptions);
    hideElement(weaponBtn);
  } else {
    weaponOptions.innerHTML = "";

    for (var j = 0; j < weapons.length; j++) {
      var weapon = weapons[j];
      var option = document.createElement("option");
      option.value = weapon.ID;
      option.text = weapon.Name;
      weaponOptions.add(option);
    }

    let selectedIndex = 0;

    for (var k = 0; k < weaponOptions.options.length; k++) {
      if (parseInt(weaponOptions.options[k].value) === player.CurrentWeapon) {
        selectedIndex = k;
        break;
      }
    }
    weaponOptions.selectedIndex = selectedIndex;
  }
}

function updatePotionListInUI() {
  var potions = [];
  var inventory = player.Inventory;

  for (var i = 0; i < inventory.length; i++) {
    var inventoryItem = inventory[i];
    if (inventoryItem.Details instanceof HealingPotion) {
      if (inventoryItem.Quantity > 0) {
        potions.push(inventoryItem.Details);
      }
    }
  }

  if (potions.length === 0) {
    hideElement(potionOptions);
    hideElement(potionBtn);
  } else {
    potionOptions.innerHTML = "";

    for (var j = 0; j < potions.length; j++) {
      var potion = potions[j];
      var option = document.createElement("option");
      option.value = potion.ID;
      option.text = potion.Name;
      potionOptions.add(option);
    }

    potionOptions.selectedIndex = 0;
  }
}

function spawnMonster(newLocation) {
  addLine("You see a " + newLocation.MonsterLivingHere.Name + ".");

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

  currentMonster.LootTable.push(
    ...standardMonster.LootTable.map((lootItem) => ({ ...lootItem }))
  );
}

function moveTo(newLocation) {
  if (!player.hasRequiredItemToEnter(newLocation)) {
    addLine(
      "You must have a " +
        newLocation.ItemToEnter.Name +
        " to enter this location."
    );

    return;
  }

  player.CurrentLocation = newLocation;
  currentLocation = newLocation;

  locationName.innerText = player.CurrentLocation.Name;
  locationDescription.innerText = player.CurrentLocation.Description;

  updateButtonClass(northBtn, newLocation.LocationToNorth);
  updateButtonClass(eastBtn, newLocation.LocationToEast);
  updateButtonClass(southBtn, newLocation.LocationToSouth);
  updateButtonClass(westBtn, newLocation.LocationToWest);

  player.CurrentHitPoints = player.MaximumHitPoints;

  updatePlayerStats(player, hpText, goldText, experienceText, levelText);

  if (newLocation.QuestAvailableHere !== undefined) {
    let playerAlreadyHasQuest = player.hasThisQuest(
      newLocation.QuestAvailableHere
    );
    let playerAlreadyCompletedQuest = player.hasCompletedThisQuest(
      newLocation.QuestAvailableHere
    );

    if (playerAlreadyHasQuest) {
      if (!playerAlreadyCompletedQuest) {
        let playerHasAllItemsToCompleteQuest =
          player.HasAllQuestCompletionItems(newLocation.QuestAvailableHere);

        if (playerHasAllItemsToCompleteQuest) {
          addLine(
            "You complete the '" +
              newLocation.QuestAvailableHere.Name +
              "' quest."
          );

          player.RemoveQuestCompletionItems(newLocation.QuestAvailableHere);

          addLine("You receive: ");
          addLine(
            newLocation.QuestAvailableHere.RewardExperiencePoints +
              " experience points."
          );
          addLine(newLocation.QuestAvailableHere.RewardGold + " gold.");

          player.ExperiencePoints +=
            newLocation.QuestAvailableHere.RewardExperiencePoints;
          player.Gold += newLocation.QuestAvailableHere.RewardGold;

          for (
            let i = 0;
            i < newLocation.QuestAvailableHere.RewardItems.length;
            i++
          ) {
            addLine(
              "You receive a " +
                newLocation.QuestAvailableHere.RewardItems[i]._Name +
                "."
            );
            player.AddItemToInventory(
              newLocation.QuestAvailableHere.RewardItems[i]
            );
          }

          addLine("");

          player.MarkQuestCompleted(newLocation.QuestAvailableHere);
        }
      }
    } else {
      addLine(
        "You receive the " + newLocation.QuestAvailableHere.Name + " quest."
      );
      addLine(newLocation.QuestAvailableHere.Description);
      addLine("To complete it, return with:");

      for (let qci of newLocation.QuestAvailableHere.QuestCompletionItems) {
        if (qci.Quantity === 1) {
          addLine("- " + qci.Quantity.toString() + " " + qci.Details.Name);
        } else {
          addLine(
            "- " + qci.Quantity.toString() + " " + qci.Details.NamePlural
          );
        }
      }

      player.Quests.push(new PlayerQuest(newLocation.QuestAvailableHere));
    }
  }
  if (newLocation.MonsterLivingHere !== undefined) {
    spawnMonster(newLocation);

    showElement(weaponBtn);
    showElement(weaponOptions);
    showElement(potionBtn);
    showElement(potionOptions);
  } else {
    currentMonster = null;

    hideElement(weaponBtn);
    hideElement(weaponOptions);
    hideElement(potionBtn);
    hideElement(potionOptions);
  }

  updateInventoryTable(player.Inventory);

  updateQuestsTable();

  updateWeaponListInUI();

  updatePotionListInUI();
}
