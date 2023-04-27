import { HealingPotion } from "./objects/HealingPotion.js";
import { InventoryItem } from "./objects/InventoryItem.js";
import { Monster } from "./objects/Monster.js";
import { Player } from "./objects/Player.js";
import { Weapon } from "./objects/Weapon.js";
import { Scroll } from "./objects/Scroll.js";

import {
  itemByID,
  monsterByID,
  locationByID,
  LOCATION_IDS,
  SPELL_TYPES,
  MONSTER_IDS,
} from "./world.js";

import {
  addLine,
  updateElementClass,
  hideLocationBtn,
  showElement,
  hideElement,
} from "./utils/displayUI.js";

let saveDataCurrentHitPoints = document.getElementById(
  "save-data-currentHitPoints"
);
let saveDataMaximumHitPoints = document.getElementById(
  "save-data-maximumHitPoints"
);
let saveDataGold = document.getElementById("save-data-gold");
let saveDataExperience = document.getElementById("save-data-experience");
let saveDataInventory = document.getElementById("save-data-inventory");
let saveDataLevel = document.getElementById("save-data-level");
let saveDataQuests = document.getElementById("save-data-quests");
let saveDataCurrentLocation = document.getElementById(
  "save-data-currentLocation"
);
let saveDataCurrentWeapon = document.getElementById("save-data-currentWeapon");
let saveDataCurrentPotion = document.getElementById("save-data-currentPotion");
let saveDataCurrentScroll = document.getElementById("save-data-currentScroll");
let saveDataHasSlayWyrm = document.getElementById("save-data-hasSlayWyrm");
let saveDataSubmit = document.getElementById("save-data-submit");
let saveDataForm = document.getElementById("save-data-form");

let raceText = document.getElementById("race");
let hpBar = document.getElementById("hp-bar");
let goldText = document.getElementById("gold");
let experienceBar = document.getElementById("experience-bar");
let levelText = document.getElementById("level");

let locationName = document.getElementById("location-name");
let locationDescription = document.getElementById("location-description");

const inventoryContainer = document.getElementById("inventory");

let logDisplay = document.getElementById("log-display");

const northBtn = document.getElementById("north");
const eastBtn = document.getElementById("east");
const southBtn = document.getElementById("south");
const westBtn = document.getElementById("west");

const questsContainer = document.getElementById("quests");

const weaponBtn = document.getElementById("weapon-btn");
const weaponOptions = document.getElementById("weapon-options");
const potionBtn = document.getElementById("potion-btn");
const potionOptions = document.getElementById("potion-options");
const scrollBtn = document.getElementById("scroll-btn");
const scrollOptions = document.getElementById("scroll-options");

let vendorModalVisible = false;
const vendorBtn = document.getElementById("vendor-btn");
const vendorModal = document.getElementById("vendor-modal");
const vendorModalTitle = document.getElementById("vendor-modal-title");
const vendorTitle = document.getElementById("vendor-title");
const vendorPlayerGold = document.getElementById("vendor-player-gold");
const vendorLocation = document.getElementById("vendor-modal-location");
const vendorVendorInventory = document.getElementById(
  "vendor-vendor-inventory"
);
const vendorPlayerInventory = document.getElementById(
  "vendor-player-inventory"
);

let craftModalVisible = false;
const craftBtn = document.getElementById("craft-btn");
const craftModal = document.getElementById("craft-modal");
const craftModalTitle = document.getElementById("craft-modal-title");
const craftTitle = document.getElementById("craft-title");
const craftRecipeTitle = document.getElementById("craft-recipe-title");
const craftLocation = document.getElementById("craft-modal-location");
const craftTakeName = document.getElementById("craft-item-take-name");
const craftTakeQuantity = document.getElementById("craft-item-take-quantity");
const craftGiveName = document.getElementById("craft-item-give-name");
const craftGiveQuantity = document.getElementById("craft-item-give-quantity");
const craftConvertBtnContainer = document.getElementById(
  "craft-convert-btn-container"
);
const craftNotEnoughComponents = document.getElementById(
  "craft-not-enough-components"
);

let player;
let currentMonster;

function loadData() {
  fetch("/game/save")
    .then((response) => response.json())
    .then((data) => {
      loadPlayer(data);
    })
    .then(() => loadUI())
    .catch((error) => console.error(error));
}

function loadPlayer(savedCharacter) {
  player = new Player(
    savedCharacter.currentHitPoints,
    savedCharacter.maximumHitPoints,
    savedCharacter.gold,
    savedCharacter.experience,
    savedCharacter.level,
    savedCharacter.currentLocation,
    savedCharacter.currentWeapon,
    savedCharacter.currentPotion,
    savedCharacter.currentScroll,
    savedCharacter.hasSlayWyrm,
    savedCharacter.race
  );

  if (savedCharacter.inventory) {
    savedCharacter.inventory.forEach((item) => {
      player.addItemToInventory(itemByID(item.id), item.quantity);
    });
  }

  if (savedCharacter.quests) {
    savedCharacter.quests.forEach((quest) => {
      player.addQuestById(quest.id, quest.isCompleted);
    });
  }
}

loadData();

saveDataSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  saveDataCurrentHitPoints.value = player.CurrentHitPoints;
  saveDataMaximumHitPoints.value = player.MaximumHitPoints;
  saveDataGold.value = player.Gold;
  saveDataExperience.value = player.Experience;
  saveDataInventory.value = JSON.stringify(parseInventory());
  saveDataLevel.value = player.Level;
  saveDataQuests.value = JSON.stringify(parseQuests());
  saveDataCurrentLocation.value = player.CurrentLocation.ID;
  saveDataCurrentWeapon.value = player.CurrentWeapon;
  saveDataCurrentPotion.value = player.CurrentPotion;
  saveDataCurrentScroll.value = player.CurrentScroll;
  saveDataHasSlayWyrm.value = player.HasSlayWyrm;

  saveDataForm.submit();
});

function parseInventory() {
  let inventory = [];
  player.Inventory.forEach((item) => {
    inventory.push({
      id: item.Details.ID,
      quantity: item.Quantity,
    });
  });

  return inventory;
}

function parseQuests() {
  let quests = [];
  player.Quests.forEach((quest) => {
    quests.push({
      id: quest.Details.ID,
      isCompleted: quest.IsCompleted,
    });
  });

  return quests;
}

function loadUI() {
  raceText.innerText = `${player.Race}`;
  updateLocationUI();
  updateMovementButtons(player.CurrentLocation);
  updateQuestsTable();
  updateUIAfterFight();
  showInteractableUI(player.CurrentLocation);
  updateAllItemListInUI();
}

document.addEventListener("keydown", function (e) {
  if (e.key === "w") {
    if (!northBtn.classList.contains("disabled")) {
      moveTo(player.CurrentLocation.LocationToNorth);
    }
  }
  if (e.key === "d") {
    if (!eastBtn.classList.contains("disabled")) {
      moveTo(player.CurrentLocation.LocationToEast);
    }
  }
  if (e.key === "s") {
    if (!southBtn.classList.contains("disabled")) {
      moveTo(player.CurrentLocation.LocationToSouth);
    }
  }
  if (e.key === "a") {
    if (!westBtn.classList.contains("disabled")) {
      moveTo(player.CurrentLocation.LocationToWest);
    }
  }

  if (e.key === "q") {
    if (!weaponBtn.classList.contains("d-none")) {
      weaponLogic();
    }
  }
  if (e.key === "e") {
    if (!potionBtn.classList.contains("d-none")) {
      potionLogic();
    }
  }
  if (e.key === "r") {
    if (!scrollBtn.classList.contains("d-none")) {
      scrollLogic();
    }
  }

  if (e.key === "Escape") {
    vendorModalVisible = false;
  }
  if (e.key === "f") {
    if (!vendorBtn.classList.contains("d-none") && !vendorModalVisible) {
      const modalInstance = new bootstrap.Modal(vendorModal);
      modalInstance.show();
      vendorModalVisible = true;
      vendorLogic();
    }
  }

  if (e.key === "g") {
    if (!craftBtn.classList.contains("d-none") && !craftModalVisible) {
      const modalInstance = new bootstrap.Modal(craftModal);
      modalInstance.show();
      craftModalVisible = true;
      craftLogic();
    }
  }
});

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
  vendorLogic();
});

function vendorLogic() {
  let vendor = player.CurrentLocation.VendorWorkingHere;

  vendorModalTitle.innerText = "Trade";
  vendorTitle.innerText = vendor.Name;
  vendorPlayerGold.innerText = "Gold " + player.Gold;
  vendorLocation.innerText = player.CurrentLocation.Name;

  updateTradeTablePlayer();
  updateTradeTableVendor();
}

craftBtn.addEventListener("click", function (e) {
  craftLogic();
});

function craftLogic() {
  let craft = player.CurrentLocation.CraftHere;

  craftModalTitle.innerText = "Craft";
  craftTitle.innerText = craft.Name;
  craftRecipeTitle.innerText = craft.Recipe.Name;
  craftLocation.innerText = player.CurrentLocation.Name;
  craftTakeName.innerText = craft.Recipe.RecipeItemToTake.Details.Name;
  craftGiveName.innerText = craft.Recipe.RecipeItemToGive.Details.Name;

  updateCraftUI();
  updateInventoryTable(player.Inventory);
}

function updateCraftUI() {
  craftConvertBtnContainer.innerHTML = "";
  let craft = player.CurrentLocation.CraftHere;

  updateCraftRecipeUI(craft);

  if (
    player.getQuantityOfItem(craft.Recipe.RecipeItemToTake.Details) >=
    craft.Recipe.RecipeItemToTake.Quantity
  ) {
    hideElement(craftNotEnoughComponents);
    craftConvertBtnContainer.innerHTML = `<button class="btn btn-primary" type="button">Craft</button>`;
    const button = craftConvertBtnContainer.querySelector("button");

    button.addEventListener("click", () => {
      player.removeItemFromInventory(
        craft.Recipe.RecipeItemToTake.Details,
        craft.Recipe.RecipeItemToTake.Quantity
      );
      player.addItemToInventory(
        craft.Recipe.RecipeItemToGive.Details,
        craft.Recipe.RecipeItemToGive.Quantity
      );

      updateCraftUI();
      updateCraftRecipeUI(craft);
      updateInventoryTable(player.Inventory);
    });
  } else {
    showElement(craftNotEnoughComponents);
  }
}

function updateCraftRecipeUI(craft) {
  if (
    player.getQuantityOfItem(craft.Recipe.RecipeItemToTake.Details) === false
  ) {
    craftTakeQuantity.innerText =
      "0 / " + craft.Recipe.RecipeItemToTake.Quantity;
  } else {
    craftTakeQuantity.innerText =
      player.getQuantityOfItem(craft.Recipe.RecipeItemToTake.Details) +
      " / " +
      craft.Recipe.RecipeItemToTake.Quantity;
  }

  craftGiveQuantity.innerText = craft.Recipe.RecipeItemToGive.Quantity;
}

function updateVendorGold() {
  vendorPlayerGold.innerText = "Gold " + player.Gold;
}

weaponBtn.addEventListener("click", function (e) {
  weaponLogic();
});

function weaponLogic() {
  hideMovementButtons();

  player.CurrentWeapon = parseInt(
    weaponOptions.options[weaponOptions.selectedIndex].value
  );

  let currentWeapon = itemByID(
    parseInt(weaponOptions.options[weaponOptions.selectedIndex].value)
  );

  let damageToMonster = currentWeapon.getPhysicalDamage(
    player.strengthModifier()
  );

  currentMonster.CurrentHitPoints -= damageToMonster.damage;

  const damageText = damageToMonster.isCrit
    ? "<span class='text-muted'>Critical! You hit the</span> " +
      currentMonster.Name +
      " <span class='text-muted'>for</span> " +
      damageToMonster.damage +
      " <span class='text-muted'>points of damage.</span>"
    : "<span class='text-muted'>You hit the</span> " +
      currentMonster.Name +
      " <span class='text-muted'>for</span> " +
      damageToMonster.damage +
      " <span class='text-muted'>points of damage.</span>";

  addLine(logDisplay, damageText);

  if (currentMonster.CurrentHitPoints <= 0) {
    if (currentMonster.ID === MONSTER_IDS.WYRM) {
      addLine(
        logDisplay,
        "<span class='text-muted'>You defeated </span> " +
          currentMonster.Name +
          " <span class='text-muted'>. Congratulations! You completed the game!!! Thanks for playing.</span>"
      );
      addLine(logDisplay, "");

      player.HasSlayWyrm = true;

      receiveExp(currentMonster);
      receiveGold(currentMonster);
      lootItems(currentMonster);
      player.CurrentHitPoints = player.MaximumHitPoints;

      updateMovementButtons(player.CurrentLocation);
      showInteractableUI(player.CurrentLocation);

      updateUIAfterFight();
    } else {
      addLine(
        logDisplay,
        "<span class='text-muted'>You defeated the</span> " +
          currentMonster.Name +
          "<span class='text-muted'>.</span>"
      );

      receiveExp(currentMonster);
      receiveGold(currentMonster);
      lootItems(currentMonster);
      player.CurrentHitPoints = player.MaximumHitPoints;

      updateMovementButtons(player.CurrentLocation);
      showInteractableUI(player.CurrentLocation);

      updateUIAfterFight();
    }
  } else {
    monsterAttack(currentMonster);
  }
}

potionBtn.addEventListener("click", function (e) {
  potionLogic();
});

function potionLogic() {
  hideMovementButtons();

  player.CurrentPotion = parseInt(
    potionOptions.options[potionOptions.selectedIndex].value
  );

  let currentPotion = itemByID(
    parseInt(potionOptions.options[potionOptions.selectedIndex].value)
  );

  restoreHealthWithConsumable(currentPotion.AmountToHeal, currentPotion);

  addLine(
    logDisplay,
    "<span class='text-muted'>You drink a</span> " +
      currentPotion.Name +
      " <span class='text-muted'>. You restore </span> " +
      currentPotion.AmountToHeal +
      " <span class='text-muted'>hit points.</span>"
  );

  monsterAttack(currentMonster);

  updateInventoryTable(player.Inventory);
  updateItemListInUI(
    HealingPotion,
    potionOptions,
    potionBtn,
    player.CurrentPotion
  );
}

scrollBtn.addEventListener("click", function (e) {
  scrollLogic();
});

function scrollLogic() {
  hideMovementButtons();

  player.CurrentScroll = parseInt(
    scrollOptions.options[scrollOptions.selectedIndex].value
  );

  let currentScroll = itemByID(
    parseInt(scrollOptions.options[scrollOptions.selectedIndex].value)
  );

  if (currentScroll.SpellType === SPELL_TYPES.DAMAGE) {
    let damageToMonster = currentScroll.getMagicalDamage(
      player.intellectModifier()
    );

    hideMovementButtons();

    currentMonster.CurrentHitPoints -= damageToMonster;

    player.removeItemFromInventory(currentScroll);

    if (currentMonster.ID === MONSTER_IDS.WYRM) {
      addLine(
        logDisplay,
        "<span class='text-muted'>You cast </span> " +
          currentScroll.SpellName +
          " <span class='text-muted'>. It deals </span>" +
          damageToMonster +
          " <span class='text-muted'> points of damage to </span> " +
          currentMonster.Name +
          " <span class='text-muted'>.</span>"
      );
    } else {
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
    }

    if (currentMonster.CurrentHitPoints <= 0) {
      if (currentMonster.ID === MONSTER_IDS.WYRM) {
        addLine(
          logDisplay,
          "<span class='text-muted'>You defeated </span> " +
            currentMonster.Name +
            " <span class='text-muted'>. Congratulations! You completed the game!!! Thanks for playing.</span>"
        );

        player.HasSlayWyrm = true;
      } else {
        addLine(
          logDisplay,
          "<span class='text-muted'>You defeated the</span> " +
            currentMonster.Name +
            " <span class='text-muted'>.</span>"
        );
      }

      receiveExp(currentMonster);
      receiveGold(currentMonster);
      lootItems(currentMonster);
      player.CurrentHitPoints = player.MaximumHitPoints;

      updateMovementButtons(player.CurrentLocation);
      updateUIAfterFight();
      spawnMonster(player.CurrentLocation);
    } else {
      monsterAttack(currentMonster);
    }
  } else if (currentScroll.SpellType === SPELL_TYPES.HEALING) {
    let healingDone = currentScroll.getMagicalDamage(
      player.intellectModifier()
    );

    restoreHealthWithConsumable(healingDone, currentScroll);

    addLine(
      logDisplay,
      "<span class='text-muted'>You cast </span> " +
        currentScroll.SpellName +
        " <span class='text-muted'>. It heals you </span>" +
        healingDone +
        " <span class='text-muted'> hit points.</span> "
    );

    monsterAttack(currentMonster);
  }

  updateInventoryTable(player.Inventory);
  updateItemListInUI(Scroll, scrollOptions, scrollBtn, player.CurrentScroll);
}

function updatePlayerStats() {
  updateHp();
  goldText.innerText = player.Gold;
  console.log(player.Experience);

  let remainingExp = player.Level * 200 - player.Experience;
  experienceBar.style.width = `${100 - (remainingExp / 200) * 100}%`;
  experienceBar.setAttribute("aria-valuenow", `${remainingExp}`);
  experienceBar.setAttribute("aria-valuemin", "0");
  experienceBar.setAttribute("aria-valuemax", "200");

  levelText.innerText = player.Level;
}

function updateHp() {
  let hpDiff = (player.CurrentHitPoints / player.MaximumHitPoints) * 100;
  hpBar.style.width = `${hpDiff}%`;
  hpBar.setAttribute("aria-valuenow", `${hpDiff}`);
  hpBar.setAttribute("aria-valuemin", "0");
  hpBar.setAttribute("aria-valuemax", `${player.MaximumHitPoints}`);
}

function hideMovementButtons() {
  hideLocationBtn(northBtn);
  hideLocationBtn(eastBtn);
  hideLocationBtn(southBtn);
  hideLocationBtn(westBtn);
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

function updateTradeTableVendor() {
  const table = vendorVendorInventory.querySelector("table");
  table.innerHTML = "";

  if (player.CurrentLocation.VendorWorkingHere.Inventory.length !== 0) {
    let headers;
    if (player.Gold <= 0) {
      headers = "<p>You have no money!</p>";
    } else {
      headers = "<td>Item</td><td>Quantity</td><td>Price</td>";
    }

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = headers;
    table.appendChild(headerRow);

    for (const item of player.CurrentLocation.VendorWorkingHere.Inventory) {
      if (player.Gold > 0) {
        if (item.Details.Price !== -1) {
          const itemRow = document.createElement("tr");
          itemRow.innerHTML = `<td>${item.Details.Name}</td><td>${item.Quantity}</td><td>${item.Details.Price}</td><td><button class="btn btn-success" type="button" value="${item.ItemID}">Buy 1</button></td>`;
          table.appendChild(itemRow);

          const button = itemRow.querySelector("button");

          button.addEventListener("click", () => {
            player.addItemToInventory(item.Details);
            player.CurrentLocation.VendorWorkingHere.removeItemFromInventory(
              item.Details
            );
            player.Gold -= item.Details.Price;
            updateVendorGold();
            updateTradeTablePlayer();
            updateTradeTableVendor();
            updateInventoryTable(player.Inventory);
            updatePlayerStats();
          });
        }
      }
    }
  } else {
    let headers = "<p>I've got nothing more to trade.</p>";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = headers;
    table.appendChild(headerRow);
  }
}

function updateTradeTablePlayer() {
  const table = vendorPlayerInventory.querySelector("table");
  table.innerHTML = "";

  let headers;

  if (player.Inventory.length === 1) {
    headers = "<p>No items to sell...</p>";
  } else {
    headers = "<td>Item</td><td>Quantity</td><td>Price</td>";
  }

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = headers;
  table.appendChild(headerRow);

  for (const item of player.Inventory) {
    if (item.Details.Price !== -1) {
      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `<td>${item.Details.Name}</td><td>${item.Quantity}</td><td>${item.Details.Price}</td><td><button class="btn btn-danger" type="button" value="${item.ItemID}">Sell 1</button></td>`;
      table.appendChild(itemRow);

      const button = itemRow.querySelector("button");

      button.addEventListener("click", () => {
        player.removeItemFromInventory(item.Details);
        player.CurrentLocation.VendorWorkingHere.addItemToInventory(
          item.Details
        );
        player.Gold += item.Details.Price;
        updateVendorGold();
        updateTradeTableVendor();
        updateTradeTablePlayer();
        updateInventoryTable(player.Inventory);
        updatePlayerStats();
      });
    }
  }
}

function updateInventoryTable(inventory) {
  const inventoryTable = inventoryContainer.querySelector("table");
  inventoryTable.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<td>Item</td><td>Quantity</td>";
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
  headerRow.innerHTML = "<td>Quest</td><td>Completed</td>";
  questsTable.appendChild(headerRow);

  if (player.Quests.length === 0) {
    const questRow = document.createElement("tr");
    const checkBoxCell = document.createElement("td");
    questRow.innerHTML = `<td>No quests yet!</td>`;
    questRow.appendChild(checkBoxCell);
    questsTable.appendChild(questRow);
  } else {
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

function updateAllItemListInUI() {
  updateItemListInUI(Weapon, weaponOptions, weaponBtn, player.CurrentWeapon);
  updateItemListInUI(
    HealingPotion,
    potionOptions,
    potionBtn,
    player.CurrentPotion
  );
  updateItemListInUI(Scroll, scrollOptions, scrollBtn, player.CurrentScroll);
}

function updateUIAfterFight() {
  updatePlayerStats();
  updateInventoryTable(player.Inventory);
  updateAllItemListInUI();
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

  if (!player.hasRequiredLevelToEnter(newLocation)) {
    addLine(
      logDisplay,
      "<span class='text-muted'>I'm not strong enough to go to that location.</span>"
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
            "<span class='text-warning'>You complete</span> " +
              newLocation.QuestAvailableHere.Name +
              " <span class='text-warning'>quest.</span>"
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
        "<span class='text-warning'>You receive</span> " +
          newLocation.QuestAvailableHere.Name +
          "<span class='text-warning'>. " +
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

      addLine(logDisplay, "");

      player.addQuest(player.CurrentLocation);
    }
  }

  showInteractableUI(newLocation);

  updateInventoryTable(player.Inventory);
  updateQuestsTable();
  updateAllItemListInUI();
  updatePlayerStats();
  updateVendorGold();
}

function showInteractableUI(location) {
  if (location.MonsterLivingHere !== undefined) {
    showElement(weaponBtn);
    showElement(weaponOptions);
    showElement(potionBtn);
    showElement(potionOptions);
    showElement(scrollBtn);
    showElement(scrollOptions);

    spawnMonster(location);
  } else {
    currentMonster = null;

    hideElement(weaponBtn);
    hideElement(weaponOptions);
    hideElement(potionBtn);
    hideElement(potionOptions);
    hideElement(scrollBtn);
    hideElement(scrollOptions);
  }

  if (location.VendorWorkingHere !== undefined) {
    showElement(vendorBtn);
  } else {
    hideElement(vendorBtn);
  }

  if (location.CraftHere !== undefined) {
    showElement(craftBtn);
  } else {
    hideElement(craftBtn);
  }
}

function spawnMonster(newLocation) {
  let standardMonster = monsterByID(newLocation.MonsterLivingHere.ID);

  currentMonster = new Monster(
    standardMonster.ID,
    standardMonster.Name,
    standardMonster.MinimumDamage,
    standardMonster.MaximumDamage,
    standardMonster.RewardGold,
    standardMonster.CurrentHitPoints,
    standardMonster.MaximumHitPoints,
    standardMonster.Level,
    standardMonster.IsPoisonous
  );

  currentMonster.LootTable.push(
    ...standardMonster.LootTable.map((lootItem) => ({ ...lootItem }))
  );

  if (
    newLocation.MonsterLivingHere.ID === MONSTER_IDS.WYRM &&
    player.HasSlayWyrm === false
  ) {
    addLine(
      logDisplay,
      "<span class='text-muted'>You see </span> " +
        newLocation.MonsterLivingHere.Name +
        "<span class='text-muted'>.</span>"
    );
    console.log("a");
  } else if (
    newLocation.MonsterLivingHere.ID === MONSTER_IDS.WYRM &&
    player.HasSlayWyrm === true
  ) {
    currentMonster = null;

    hideElement(weaponBtn);
    hideElement(weaponOptions);
    hideElement(potionBtn);
    hideElement(potionOptions);
    hideElement(scrollBtn);
    hideElement(scrollOptions);
  } else {
    addLine(
      logDisplay,
      "<span class='text-muted'>You see a</span> " +
        newLocation.MonsterLivingHere.Name +
        "<span class='text-muted'>.</span>"
    );
  }
}

function restoreHealthWithConsumable(amountToHeal, item) {
  player.CurrentHitPoints += amountToHeal;

  if (player.CurrentHitPoints > player.MaximumHitPoints) {
    player.CurrentHitPoints = player.MaximumHitPoints;
  }

  player.removeItemFromInventory(item);
}

function monsterAttack(currentMonster) {
  let damageToPlayer = currentMonster.getDamageToPlayer();

  addLine(
    logDisplay,
    "<span class='text-muted'>The</span> " +
      currentMonster.Name +
      " <span class='text-muted'>did</span> " +
      damageToPlayer +
      " <span class='text-muted'>points of damage.</span>"
  );

  if (currentMonster.IsPoisonous) {
    damageToPlayer += poisonPlayer();
  }

  player.CurrentHitPoints -= damageToPlayer;
  updateHp();

  if (player.CurrentHitPoints <= 0) {
    playerDeath();
  }
}

function poisonPlayer() {
  let poisonDamage = parseInt((5 / 100) * player.MaximumHitPoints);
  addLine(
    logDisplay,
    "<span class='text-muted'>You got poisoned! You receive </span> " +
      poisonDamage +
      " <span class='text-muted'> points of damage.</span>"
  );

  return poisonDamage;
}

function receiveExp(currentMonster) {
  if (Math.abs(player.Level - currentMonster.Level) <= 3) {
    addLine(
      logDisplay,
      "<span class='text-warning'>You gain " +
        player.experiencePointsForDefeatingAMonster() +
        "xp</span>."
    );

    player.addExperiencePoints(player.experiencePointsForDefeatingAMonster())
      ? addLine(
          logDisplay,
          "<span class='text-warning'>Congratulations! You are now level " +
            player.Level +
            "!</span>"
        )
      : null;
  }
}

function receiveGold(currentMonster) {
  if (currentMonster.RewardGold > 0) {
    player.Gold += currentMonster.RewardGold;
    addLine(
      logDisplay,
      "<span class='text-warning'>You Loot " +
        currentMonster.RewardGold +
        " gold</span>."
    );
  }
}

function lootItems(currentMonster) {
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
  addLine(logDisplay, "");
}

function playerDeath() {
  addLine(
    logDisplay,
    "<span class='text-muted'>The</span> " +
      currentMonster.Name +
      " <span class='text-muted'>killed you...</span>"
  );
  addLine(
    logDisplay,
    "<span class='text-primary'>Wake up adventurer, your time hasn't come yet.</span> "
  );
  addLine(
    logDisplay,
    "<span class='text-muted'>Everything looks dizzy...</span> "
  );
  addLine(logDisplay, "");

  let respawnPoint;

  switch (player.CurrentLocation.Region.ID) {
    case 1:
      respawnPoint = locationByID(LOCATION_IDS.HOME);
      break;
    case 2:
      respawnPoint = locationByID(LOCATION_IDS.SUNSET_OASIS);
      break;
    case 3:
      respawnPoint = locationByID(LOCATION_IDS.FROZEN_FOREST);
      break;
    case 4:
      respawnPoint = locationByID(LOCATION_IDS.PORT_ROYALE);
      break;
    case 5:
      respawnPoint = locationByID(LOCATION_IDS.CATHEDRAL_ENTRANCE);
      break;
    default:
      respawnPoint = locationByID(LOCATION_IDS.HOME);
  }
  moveTo(respawnPoint);
  updateMovementButtons(player.CurrentLocation);
}
