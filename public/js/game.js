// Wyrm's Lair
// Objects
import { HealingPotion } from "./objects/HealingPotion.js";
import { InventoryItem } from "./objects/InventoryItem.js";
import { Monster } from "./objects/Monster.js";
import { Player } from "./objects/Player.js";
import { PlayerQuest } from "./objects/PlayerQuest.js";
import { Weapon } from "./objects/Weapon.js";

// World
import { itemByID, monsterByID, locationByID, LOCATION_IDS } from "./world.js";

// Utils
import { randomNumberGenerator } from "./utils/randomNumberGenerator.js";
import {
  addLine,
  updateButtonClass,
  showElement,
  hideElement,
} from "./utils/displayUI.js";

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
let player = new Player();
player = player.createDefaultPlayer();

// global - current location
let currentLocation = locationByID(LOCATION_IDS.HOME);

locationName.innerText = player.CurrentLocation.Name;
locationDescription.innerText = player.CurrentLocation.Description;

updateMovementButtons(player.CurrentLocation);

updatePlayerStats(player, hpText, goldText, experienceText, levelText);

updateQuestsTable();
updateInventoryTable(player.Inventory);

updateWeaponListInUI();
hideElement(weaponBtn);
hideElement(weaponOptions);
hideElement(potionBtn);
hideElement(potionOptions);

// location btn events
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

// action btn events
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
    logDisplay,
    "You hit the " +
      currentMonster.Name +
      " for " +
      damageToMonster +
      " points of damage."
  );

  if (currentMonster.CurrentHitPoints <= 0) {
    addLine(logDisplay, "You defeated the " + currentMonster.Name + " .");

    player.addExperiencePoints(currentMonster.RewardExperiencePoints)
      ? addLine(logDisplay, "You are now level " + player.Level + "!")
      : null;

    addLine(
      logDisplay,
      "You gain <span class='text-warning'>" +
        currentMonster.RewardExperiencePoints +
        "xp</span>."
    );

    player.Gold += currentMonster.RewardGold;
    addLine(
      logDisplay,
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
      player.addItemToInventory(itemLooted.Details);

      if (itemLooted.Quantity === 1) {
        addLine(
          logDisplay,
          "You loot " +
            itemLooted.Quantity +
            " " +
            itemLooted.Details.Name +
            "."
        );
      } else {
        addLine(
          logDisplay,
          "You loot " +
            itemLooted.Quantity +
            " " +
            itemLooted.Details.NamePlural +
            "."
        );
      }
    });

    updatePlayerStats(player, hpText, goldText, experienceText, levelText);

    updateInventoryTable(player.Inventory);
    updateWeaponListInUI();
    updatePotionListInUI();

    spawnMonster(currentLocation);
  } else {
    let damageToPlayer = randomNumberGenerator(0, currentMonster.MaximumDamage);

    addLine(
      logDisplay,
      "The " +
        currentMonster.Name +
        " did " +
        damageToPlayer +
        " points of damage."
    );

    player.CurrentHitPoints -= damageToPlayer;

    hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;

    if (player.CurrentHitPoints <= 0) {
      hpText.innerText = `0 / ${player.MaximumHitPoints}`;
      addLine(logDisplay, "The " + currentMonster.Name + " killed you...");

      // TODO - permanent death?
      moveTo(locationByID(LOCATION_IDS.HOME));
      updateMovementButtons(currentLocation);
    }
  }
});

potionBtn.addEventListener("click", function (e) {
  player.CurrentPotion = parseInt(
    potionOptions.options[potionOptions.selectedIndex].value
  );

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

  addLine(logDisplay, "You drink a " + currentPotion.Name + ".");

  let damageToPlayer = randomNumberGenerator(0, currentMonster.MaximumDamage);

  addLine(
    logDisplay,
    "The " +
      currentMonster.Name +
      " did " +
      damageToPlayer +
      " points of damage."
  );

  player.CurrentHitPoints -= damageToPlayer;

  hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;

  if (player.CurrentHitPoints <= 0) {
    hpText.innerText = `0 / ${player.MaximumHitPoints}`;
    addLine(logDisplay, "The " + currentMonster.Name + " killed you...");

    // TODO - permanent death?
    moveTo(locationByID(LOCATION_IDS.HOME));
    updateMovementButtons(currentLocation);
  }

  updateInventoryTable(player.Inventory);
  updatePotionListInUI();
});

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

    let selectedIndex = 0;

    for (var k = 0; k < potionOptions.options.length; k++) {
      if (parseInt(potionOptions.options[k].value) === player.CurrentPotion) {
        selectedIndex = k;
        break;
      }
    }
    potionOptions.selectedIndex = selectedIndex;
  }
}

function spawnMonster(newLocation) {
  addLine(logDisplay, "");
  addLine(logDisplay, "You see a " + newLocation.MonsterLivingHere.Name + ".");

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
      logDisplay,
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

  updateMovementButtons(newLocation);

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
          player.hasAllQuestCompletionItems(newLocation.QuestAvailableHere);

        if (playerHasAllItemsToCompleteQuest) {
          addLine(
            logDisplay,
            "You complete the '" +
              newLocation.QuestAvailableHere.Name +
              "' quest."
          );

          player.removeQuestCompletionItems(newLocation.QuestAvailableHere);

          addLine(logDisplay, "You receive: ");
          addLine(
            logDisplay,
            newLocation.QuestAvailableHere.RewardExperiencePoints +
              " experience points."
          );
          addLine(
            logDisplay,
            newLocation.QuestAvailableHere.RewardGold + " gold."
          );

          player.addExperiencePoints(
            newLocation.QuestAvailableHere.RewardExperiencePoints
          )
            ? addLine(logDisplay, "You are now level " + player.Level + "!")
            : null;
          player.Gold += newLocation.QuestAvailableHere.RewardGold;

          for (
            let i = 0;
            i < newLocation.QuestAvailableHere.RewardItems.length;
            i++
          ) {
            addLine(
              logDisplay,
              "You receive a " +
                newLocation.QuestAvailableHere.RewardItems[i]._Name +
                "."
            );
            player.addItemToInventory(
              newLocation.QuestAvailableHere.RewardItems[i]
            );
          }

          addLine(logDisplay, "");

          player.markQuestCompleted(newLocation.QuestAvailableHere);
        }
      }
    } else {
      addLine(
        logDisplay,
        "You receive the " +
          newLocation.QuestAvailableHere.Name +
          " quest. " +
          newLocation.QuestAvailableHere.Description +
          " To complete it, return with:"
      );

      for (let qci of newLocation.QuestAvailableHere.QuestCompletionItems) {
        if (qci.Quantity === 1) {
          addLine(
            logDisplay,
            "- " + qci.Quantity.toString() + " " + qci.Details.Name
          );
        } else {
          addLine(
            logDisplay,
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

  updatePlayerStats(player, hpText, goldText, experienceText, levelText);
}

function updateMovementButtons(location) {
  updateButtonClass(northBtn, location.LocationToNorth);
  updateButtonClass(eastBtn, location.LocationToEast);
  updateButtonClass(southBtn, location.LocationToSouth);
  updateButtonClass(westBtn, location.LocationToWest);
}
