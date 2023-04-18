// Objects
import { HealingPotion } from "./objects/HealingPotion.js";
import { InventoryItem } from "./objects/InventoryItem.js";
import { Monster } from "./objects/Monster.js";
import { Player } from "./objects/Player.js";
import { PlayerQuest } from "./objects/PlayerQuest.js";
import { Weapon } from "./objects/Weapon.js";
import { Scroll } from "./objects/Scroll.js";

// World
import {
  itemByID,
  monsterByID,
  locationByID,
  regionByID,
  ITEM_IDS,
  LOCATION_IDS,
  SPELL_TYPES,
} from "./world.js";

// Utils
import { randomNumberGenerator } from "./utils/randomNumberGenerator.js";
import {
  addLine,
  updateElementClass,
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
const scrollBtn = document.getElementById("scroll-btn");
const scrollOptions = document.getElementById("scroll-options");

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
console.log(player.Level);
player.addItemToInventory(itemByID(ITEM_IDS.SCROLL_FIREBALL_I));
player.addItemToInventory(itemByID(ITEM_IDS.SCROLL_FIREBALL_I));
player.addItemToInventory(itemByID(ITEM_IDS.SCROLL_RENEW_I));
player.addItemToInventory(itemByID(ITEM_IDS.SCROLL_RENEW_I));

updateLocationUI();

updateMovementButtons(player.CurrentLocation);
updatePlayerStats();
updateQuestsTable();
updateInventoryTable(player.Inventory);
updateItemListInUI(Weapon, weaponOptions, weaponBtn, player.CurrentWeapon);
updateItemListInUI(
  HealingPotion,
  potionOptions,
  potionBtn,
  player.CurrentPotion
);
updateItemListInUI(Scroll, scrollOptions, scrollBtn, player.CurrentScroll);
hideElement(vendorBtn);
hideElement(weaponBtn);
hideElement(weaponOptions);
hideElement(potionBtn);
hideElement(potionOptions);
hideElement(scrollBtn);
hideElement(scrollOptions);

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

  vendorModalTitle.innerText = "Trade";
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
    if (item.Details.Price !== -1) {
      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `<td>${item.Details.Name}</td><td>${item.Quantity}</td><td>${item.Details.Price}</td><td><button class="btn btn-outline-dark" type="button" value="${item.ItemID}">${tradeType} 1</button></td>`;
      table.appendChild(itemRow);

      const button = itemRow.querySelector("button");

      button.addEventListener("click", () => {
        if (isVendor) {
          player.addItemToInventory(item.Details);
          player.CurrentLocation.VendorWorkingHere.removeItemFromInventory(
            item.Details
          );
          player.Gold -= item.Details.Price;
          console.log(player.Inventory);

          updateTradeTable(
            true,
            vendorVendorInventory,
            headers,
            player.CurrentLocation.VendorWorkingHere.Inventory
          );
          updateTradeTable(
            false,
            vendorPlayerInventory,
            headers,
            player.Inventory
          );
          updatePlayerStats();
          updateInventoryTable(player.Inventory);
        } else {
          player.removeItemFromInventory(item.Details, 1);
          player.CurrentLocation.VendorWorkingHere.addItemToInventory(
            item.Details
          );
          player.Gold += item.Details.Price;

          updateTradeTable(
            false,
            vendorPlayerInventory,
            headers,
            player.Inventory
          );
          updateTradeTable(
            true,
            vendorVendorInventory,
            headers,
            player.CurrentLocation.VendorWorkingHere.Inventory
          );
          updatePlayerStats();
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

  let damageToMonster =
    randomNumberGenerator(
      currentWeapon.MinimumDamage,
      currentWeapon.MaximumDamage
    ) + player.strengthModifier();

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

    if (Math.abs(player.Level - currentMonster.Level) <= 3) {
      addLine(
        logDisplay,
        "<span class='text-warning'>You gain <strong>" +
          player.experiencePointsForDefeatingAMonster() +
          "</srong>xp</span>."
      );

      player.addExperiencePoints(player.experiencePointsForDefeatingAMonster())
        ? addLine(
            logDisplay,
            "<span class='text-warning'>Congratulations! You are now level <strong>" +
              player.Level +
              "</strong>!</span>"
          )
        : null;
    }

    if (currentMonster.RewardGold > 0) {
      player.Gold += currentMonster.RewardGold;
      addLine(
        logDisplay,
        "<span class='text-warning'>You Loot <strong>" +
          currentMonster.RewardGold +
          "</strong> gold</span>."
      );
    }

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

    updatePlayerStats();
    updateInventoryTable(player.Inventory);
    updateItemListInUI(Weapon, weaponOptions, weaponBtn, player.CurrentWeapon);
    updateItemListInUI(
      HealingPotion,
      potionOptions,
      potionBtn,
      player.CurrentPotion
    );
    updateItemListInUI(Scroll, scrollOptions, scrollBtn, player.CurrentScroll);

    spawnMonster(player.CurrentLocation);
  } else {
    let damageToPlayer = randomNumberGenerator(
      currentMonster.MinimumDamage,
      currentMonster.MaximumDamage
    );

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

  let damageToPlayer = randomNumberGenerator(
    currentMonster.MinimumDamage,
    currentMonster.MaximumDamage
  );

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

scrollBtn.addEventListener("click", function (e) {
  // TODO
  player.CurrentScroll = parseInt(
    scrollOptions.options[scrollOptions.selectedIndex].value
  );

  let currentScroll = itemByID(
    parseInt(scrollOptions.options[scrollOptions.selectedIndex].value)
  );

  if (currentScroll.SpellType === SPELL_TYPES.DAMAGE) {
    let damageToMonster = randomNumberGenerator(
      currentScroll.MinimumDamage,
      currentScroll.MaximumDamage
    );

    currentMonster.CurrentHitPoints -= damageToMonster;

    player.removeItemFromInventory(currentScroll);

    addLine(
      logDisplay,
      "<span class='text-muted'>You cast </span> " +
        currentScroll.SpellName +
        " <span class='text-muted'>. It deals </span>" +
        damageToMonster +
        " <span class='text-muted'> points of damage to the</span> " +
        currentMonster.Name +
        " <span class='text-muted'>.</span>"
    );

    if (currentMonster.CurrentHitPoints <= 0) {
      addLine(
        logDisplay,
        "<span class='text-muted'>You defeated the</span> " +
          currentMonster.Name +
          " <span class='text-muted'>.</span>"
      );

      if (Math.abs(player.Level - currentMonster.Level) <= 3) {
        addLine(
          logDisplay,
          "<span class='text-warning'>You gain <strong>" +
            player.experiencePointsForDefeatingAMonster() +
            "</srong>xp</span>."
        );
        player.addExperiencePoints(
          player.experiencePointsForDefeatingAMonster()
        )
          ? addLine(
              logDisplay,
              "<span class='text-warning'>Congratulations! You are now level <strong>" +
                player.Level +
                "</strong>!</span>"
            )
          : null;
      }

      if (currentMonster.RewardGold > 0) {
        player.Gold += currentMonster.RewardGold;
        addLine(
          logDisplay,
          "<span class='text-warning'>You Loot <strong>" +
            currentMonster.RewardGold +
            "</strong> gold</span>."
        );
      }

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

      updatePlayerStats();
      updateInventoryTable(player.Inventory);
      updateItemListInUI(
        Weapon,
        weaponOptions,
        weaponBtn,
        player.CurrentWeapon
      );
      updateItemListInUI(
        HealingPotion,
        potionOptions,
        potionBtn,
        player.CurrentPotion
      );
      updateItemListInUI(
        Scroll,
        scrollOptions,
        scrollBtn,
        player.CurrentScroll
      );

      spawnMonster(player.CurrentLocation);
    } else {
      let damageToPlayer = randomNumberGenerator(
        currentMonster.MinimumDamage,
        currentMonster.MaximumDamage
      );

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

        moveTo(locationByID(LOCATION_IDS.HOME));
        updateMovementButtons(player.CurrentLocation);
      }
    }
  } else if (currentScroll.SpellType === SPELL_TYPES.HEALING) {
    let healingDone = randomNumberGenerator(
      currentScroll.MinimumDamage,
      currentScroll.MaximumDamage
    );

    player.CurrentHitPoints += player.CurrentHitPoints + healingDone;

    if (player.CurrentHitPoints > player.MaximumHitPoints) {
      player.CurrentHitPoints = player.MaximumHitPoints;
    }

    player.removeItemFromInventory(currentScroll);

    addLine(
      logDisplay,
      "<span class='text-muted'>You cast </span> " +
        currentScroll.SpellName +
        " <span class='text-muted'>. It heals you </span>" +
        healingDone +
        " <span class='text-muted'> hit points.</span> "
    );

    let damageToPlayer = randomNumberGenerator(
      currentMonster.MinimumDamage,
      currentMonster.MaximumDamage
    );

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

      moveTo(locationByID(LOCATION_IDS.HOME));
      updateMovementButtons(player.CurrentLocation);
    }
  }

  updateInventoryTable(player.Inventory);
  updateItemListInUI(Scroll, scrollOptions, scrollBtn, player.CurrentScroll);
});

function updatePlayerStats() {
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
    standardMonster.MinimumDamage,
    standardMonster.MaximumDamage,
    standardMonster.RewardGold,
    standardMonster.CurrentHitPoints,
    standardMonster.MaximumHitPoints,
    standardMonster.Level
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

  updateLocationUI();

  updateMovementButtons(newLocation);
  player.CurrentHitPoints = player.MaximumHitPoints;
  updatePlayerStats();

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

          addLine(
            logDisplay,
            "<span class='text-warning'>You receive: " +
              player.experiencePointsForCompletingQuest() +
              " experience points and " +
              newLocation.QuestAvailableHere.RewardGold +
              " gold.</span>"
          );

          player.addExperiencePoints(
            player.experiencePointsForCompletingQuest()
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
    showElement(scrollBtn);
    showElement(scrollOptions);
  } else {
    currentMonster = null;

    hideElement(weaponBtn);
    hideElement(weaponOptions);
    hideElement(potionBtn);
    hideElement(potionOptions);
    hideElement(scrollBtn);
    hideElement(scrollOptions);
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
  updateItemListInUI(Scroll, scrollOptions, scrollBtn, player.CurrentScroll);
  updatePlayerStats();
}

function updateMovementButtons(location) {
  updateElementClass(northBtn, location.LocationToNorth);
  updateElementClass(eastBtn, location.LocationToEast);
  updateElementClass(southBtn, location.LocationToSouth);
  updateElementClass(westBtn, location.LocationToWest);
}

function updateLocationUI() {
  locationName.innerText =
    player.CurrentLocation.Region.Name + " - " + player.CurrentLocation.Name;
  locationDescription.innerText = player.CurrentLocation.Description;
}
