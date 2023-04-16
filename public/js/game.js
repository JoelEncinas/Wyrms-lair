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

// vendor modal
const vendorBtn = document.getElementById("vendor-btn");
const vendorModalTitle = document.getElementById("vendor-modal-title");
const vendorTitle = document.getElementById("vendor-title");
const vendorLocation = document.getElementById("vendor-modal-location");
const vendorVendorInventory = document.getElementById(
  "vendor-vendor-inventory"
);
const vendorPlayerInventory = document.getElementById(
  "vendor-player-inventory"
);

// FIRST LOAD
let currentMonster;
let player = new Player();
player = player.createDefaultPlayer();

locationName.innerText = player.CurrentLocation.Name;
locationDescription.innerText = player.CurrentLocation.Description;

updateMovementButtons(player.CurrentLocation);

updatePlayerStats(player, hpText, goldText, experienceText, levelText);

updateQuestsTable();
updateInventoryTable(player.Inventory);

updateItemListInUI(Weapon, weaponOptions, weaponBtn, player.CurrentWeapon);
hideElement(vendorBtn);
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

vendorBtn.addEventListener("click", function (e) {
  let vendor = player.CurrentLocation.VendorWorkingHere;

  vendorTitle.innerText = vendor.Name;
  vendorLocation.innerText = player.CurrentLocation.Name;

  const headers =
    '<th scope="col">Name</th><th scope="col">Quantity</th><th scope="col">Price</th>';

  updateTradeTable(true, vendorVendorInventory, headers, vendor.Inventory);

  updateTradeTable(false, vendorPlayerInventory, headers, player.Inventory);
});

function updateTradeTable(isVendor, element, headers, inventory) {
  const table = element.querySelector("table");
  table.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = headers;
  table.appendChild(headerRow);

  let tradeType = isVendor ? "Buy" : "Sell";

  for (const item of inventory) {
    if (item.Price !== -1) {
      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `<td>${item.Details.Name}</td><td>${item.Quantity}</td><td>${item.Price}</td><td><button class="btn btn-outline-dark" type="button" value="${item.ItemID}">${tradeType} 1</button></td>`;
      table.appendChild(itemRow);

      const button = itemRow.querySelector("button");

      button.addEventListener("click", () => {
        if (isVendor) {
          // TODO - Handle vendor buy logic
        } else {
          // TODO - Handle player sell logic
          player.removeItemFromInventory(item.Details, 1);
          player.Gold += item.Details.Price;
          updateTradeTable(
            false,
            vendorPlayerInventory,
            headers,
            player.Inventory
          );
          updatePlayerStats(
            player,
            hpText,
            goldText,
            experienceText,
            levelText
          );
          updateInventoryTable(player.Inventory);
        }
      });
    }
  }
}

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
    "<span class='text-muted'>You hit the</span> " +
      currentMonster.Name +
      " <span class='text-muted'>for</span> " +
      damageToMonster +
      " <span class='text-muted'>points of damage.</span>"
  );

  if (currentMonster.CurrentHitPoints <= 0) {
    addLine(
      logDisplay,
      "<span class='text-muted'>You defeated the</span> " +
        currentMonster.Name +
        " <span class='text-muted'>.</span>"
    );

    player.addExperiencePoints(currentMonster.RewardExperiencePoints)
      ? addLine(
          logDisplay,
          "<span class='text-warning'>Congratulations! You are now level <strong>" +
            player.Level +
            "</strong>!</span>"
        )
      : null;

    addLine(
      logDisplay,
      "<span class='text-warning'>You gain <strong>" +
        currentMonster.RewardExperiencePoints +
        "</srong>xp</span>."
    );

    player.Gold += currentMonster.RewardGold;
    addLine(
      logDisplay,
      "<span class='text-warning'>You Loot <strong>" +
        currentMonster.RewardGold +
        "</strong> gold</span>."
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
          "<span class='text-success'>Loot:</span> [" +
            itemLooted.Details.Name +
            "] <span class='text-success'>x" +
            itemLooted.Quantity +
            "</span>"
        );
      } else {
        addLine(
          logDisplay,
          "<span class='text-success'>Loot:</span> [" +
            itemLooted.Details.NamePlural +
            "] <span class='text-success'>x" +
            itemLooted.Quantity +
            "</span>"
        );
      }
    });

    updatePlayerStats(player, hpText, goldText, experienceText, levelText);
    updateInventoryTable(player.Inventory);
    updateItemListInUI(Weapon, weaponOptions, weaponBtn, player.CurrentWeapon);
    updateItemListInUI(
      HealingPotion,
      potionOptions,
      potionBtn,
      player.CurrentPotion
    );

    spawnMonster(player.CurrentLocation);
  } else {
    let damageToPlayer = randomNumberGenerator(0, currentMonster.MaximumDamage);

    addLine(
      logDisplay,
      "<span class='text-muted'>The</span> " +
        currentMonster.Name +
        " <span class='text-muted'>did</span> " +
        damageToPlayer +
        " <span class='text-muted'>points of damage.</span>"
    );

    player.CurrentHitPoints -= damageToPlayer;

    hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;

    if (player.CurrentHitPoints <= 0) {
      hpText.innerText = `0 / ${player.MaximumHitPoints}`;
      addLine(
        logDisplay,
        "<span class='text-muted'>The</span> " +
          currentMonster.Name +
          " <span class='text-muted'>killed you...</span>"
      );

      // TODO - permanent death?
      moveTo(locationByID(LOCATION_IDS.HOME));
      updateMovementButtons(player.CurrentLocation);
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
    if (ii.ItemID === currentPotion.ID) {
      ii.Quantity--;
      return;
    }
  });

  addLine(
    logDisplay,
    "<span class='text-muted'>You drink a</span> " +
      currentPotion.Name +
      " <span class='text-muted'>. You restore </span> " +
      currentPotion.AmountToHeal +
      " <span class='text-muted'>hit points.</span>"
  );

  let damageToPlayer = randomNumberGenerator(0, currentMonster.MaximumDamage);

  addLine(
    logDisplay,
    "<span class='text-muted'>The</span> " +
      currentMonster.Name +
      " <span class='text-muted'>did</span> " +
      damageToPlayer +
      " <span class='text-muted'>points of damage.</span>"
  );

  player.CurrentHitPoints -= damageToPlayer;

  hpText.innerText = `${player.CurrentHitPoints} / ${player.MaximumHitPoints}`;

  if (player.CurrentHitPoints <= 0) {
    hpText.innerText = `0 / ${player.MaximumHitPoints}`;
    addLine(
      logDisplay,
      "<span class='text-muted'>The</span> " +
        currentMonster.Name +
        " <span class='text-muted'>killed you...</span>"
    );

    // TODO - permanent death?
    moveTo(locationByID(LOCATION_IDS.HOME));
    updateMovementButtons(player.CurrentLocation);
  }

  updateInventoryTable(player.Inventory);
  updateItemListInUI(
    HealingPotion,
    potionOptions,
    potionBtn,
    player.CurrentPotion
  );
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

function updateItemListInUI(itemType, itemOptions, itemBtn, currentItem) {
  var items = [];
  var inventory = player.Inventory;

  for (var i = 0; i < inventory.length; i++) {
    var inventoryItem = inventory[i];
    if (inventoryItem.Details instanceof itemType) {
      if (inventoryItem.Quantity > 0) {
        items.push(inventoryItem.Details);
      }
    }
  }

  if (items.length === 0) {
    hideElement(itemOptions);
    hideElement(itemBtn);
  } else {
    itemOptions.innerHTML = "";

    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      var option = document.createElement("option");
      option.value = item.ID;
      option.text = item.Name;
      itemOptions.add(option);
    }

    let selectedIndex = 0;

    for (var k = 0; k < itemOptions.options.length; k++) {
      if (parseInt(itemOptions.options[k].value) === currentItem) {
        selectedIndex = k;
        break;
      }
    }
    itemOptions.selectedIndex = selectedIndex;
  }
}

function spawnMonster(newLocation) {
  addLine(logDisplay, "");
  addLine(
    logDisplay,
    "<span class='text-muted'>You see a</span> " +
      newLocation.MonsterLivingHere.Name +
      "<span class='text-muted'>.</span>"
  );

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
      "<span class='text-muted'>You must have a</span> " +
        newLocation.ItemToEnter.Name +
        " <span class='text-muted'>to enter this location.</span>"
    );

    return;
  }

  player.CurrentLocation = newLocation;

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
            "<span class='text-warning'>You complete</span> <strong>" +
              newLocation.QuestAvailableHere.Name +
              "</strong> <span class='text-warning'>quest.</span>"
          );

          player.removeQuestCompletionItems(newLocation.QuestAvailableHere);

          addLine(logDisplay, "<span class='text-warning'>You receive: ");
          addLine(
            logDisplay,
            newLocation.QuestAvailableHere.RewardExperiencePoints +
              " experience points and " +
              newLocation.QuestAvailableHere.RewardGold +
              " gold.</span>"
          );

          player.addExperiencePoints(
            newLocation.QuestAvailableHere.RewardExperiencePoints
          )
            ? addLine(
                logDisplay,
                "<span class='text-warning'>You are now level " +
                  player.Level +
                  "!</span>"
              )
            : null;
          player.Gold += newLocation.QuestAvailableHere.RewardGold;

          for (
            let i = 0;
            i < newLocation.QuestAvailableHere.RewardItems.length;
            i++
          ) {
            addLine(
              logDisplay,
              "<span class='text-success'>You receive a </span>" +
                newLocation.QuestAvailableHere.RewardItems[i]._Name +
                "<span class='text-success'>.</span>"
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
        "<span class='text-warning'>You receive</span> <strong>" +
          newLocation.QuestAvailableHere.Name +
          "</strong><span class='text-warning'>. " +
          newLocation.QuestAvailableHere.Description +
          " To complete it, return with:</span>"
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

  if (newLocation.VendorWorkingHere !== undefined) {
    showElement(vendorBtn);
  } else {
    hideElement(vendorBtn);
  }

  updateInventoryTable(player.Inventory);
  updateQuestsTable();
  updateItemListInUI(Weapon, weaponOptions, weaponBtn, player.CurrentWeapon);
  updateItemListInUI(
    HealingPotion,
    potionOptions,
    potionBtn,
    player.CurrentPotion
  );
  updatePlayerStats(player, hpText, goldText, experienceText, levelText);
}

function updateMovementButtons(location) {
  updateButtonClass(northBtn, location.LocationToNorth);
  updateButtonClass(eastBtn, location.LocationToEast);
  updateButtonClass(southBtn, location.LocationToSouth);
  updateButtonClass(westBtn, location.LocationToWest);
}
