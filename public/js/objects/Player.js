import { LivingCreature } from "./LivingCreature.js";
import { InventoryItem } from "./InventoryItem.js";
import {
  locationByID,
  questByID,
} from "../world.js";
import { PlayerQuest } from "./PlayerQuest.js";

export class Player extends LivingCreature {
  constructor(
    currentHitPoints,
    maximumHitPoints,
    gold,
    experience,
    level,
    currentLocation,
    currentWeapon,
    currentPotion,
    currentScroll,
    hasSlayWyrm,
    race
  ) {
    super(maximumHitPoints, currentHitPoints);
    this._Gold = gold;
    this._Experience = experience;
    this._Inventory = [];
    this._Level = level;
    this._Quests = [];
    this._CurrentLocation = locationByID(currentLocation);
    this._CurrentWeapon = currentWeapon;
    this._CurrentPotion = currentPotion;
    this._CurrentScroll = currentScroll;
    this._HasSlayWyrm = hasSlayWyrm;
    this._Race = race;
  }

  get MaximumHitPoints() {
    if (this._Level === 1) {
      return 40;
    }
    return 40 + this._Level * 10;
  }

  get Gold() {
    return this._Gold;
  }

  set Gold(value) {
    this._Gold = value;
  }

  get Experience() {
    return this._Experience;
  }

  set Experience(value) {
    this._Experience = value;
  }

  addExperiencePoints(experienceToAdd) {
    if (this._Level < 25) {
      let newLevel =
        Math.floor((this._Experience + experienceToAdd - 200) / 200) + 2;

      if (newLevel > this._Level) {
        this._Level = Math.min(newLevel, 25);
        this._Experience += experienceToAdd;
        return true;
      }

      this._Experience += experienceToAdd;
      return false;
    }

    return false;
  }

  get Level() {
    if (this._Experience < 200) {
      return 1;
    }
    return Math.min(Math.floor((this._Experience - 200) / 200) + 2, 25);
  }

  get Inventory() {
    return this._Inventory;
  }

  get Quests() {
    return this._Quests;
  }

  set Quests(value) {
    this._Quests = value;
  }

  get CurrentLocation() {
    return this._CurrentLocation;
  }

  set CurrentLocation(value) {
    this._CurrentLocation = value;
  }

  get CurrentWeapon() {
    return this._CurrentWeapon;
  }

  set CurrentWeapon(value) {
    this._CurrentWeapon = value;
  }

  get CurrentPotion() {
    return this._CurrentPotion;
  }

  set CurrentPotion(value) {
    this._CurrentPotion = value;
  }

  get CurrentScroll() {
    return this._CurrentScroll;
  }

  set CurrentScroll(value) {
    this._CurrentScroll = value;
  }

  hasRequiredItemToEnter(location) {
    if (location.ItemToEnter === undefined) {
      return true;
    }

    for (let ii of this._Inventory) {
      if (ii.Details.ID === location.ItemToEnter.ID) {
        return true;
      }
    }

    return false;
  }

  hasThisQuest(quest) {
    return this.Quests.some(
      (playerQuest) => playerQuest.Details.ID === quest.ID
    );
  }

  hasCompletedThisQuest(quest) {
    const completedQuest = this.Quests.find(
      (playerQuest) => playerQuest.Details.ID === quest.ID
    );
    return completedQuest ? completedQuest.IsCompleted : false;
  }

  hasAllQuestCompletionItems(quest) {
    for (let qci of quest.QuestCompletionItems) {
      let foundItemInPlayersInventory = false;
      for (let ii of this.Inventory) {
        if (ii.Details.ID === qci.Details.ID) {
          foundItemInPlayersInventory = true;
          if (ii.Quantity < qci.Quantity) {
            return false;
          }
        }
      }
      if (!foundItemInPlayersInventory) {
        return false;
      }
    }
    return true;
  }

  removeQuestCompletionItems(quest) {
    quest.QuestCompletionItems.forEach((qci) => {
      let matchingInventoryItems = this._Inventory.filter(
        (ii) => ii.Details.ID === qci.Details.ID
      );
      if (matchingInventoryItems.length > 0) {
        let totalQuantityToRemove = qci.Quantity;
        for (let ii of matchingInventoryItems) {
          let quantityToRemove = Math.min(ii.Quantity, totalQuantityToRemove);
          ii.Quantity -= quantityToRemove;
          totalQuantityToRemove -= quantityToRemove;
          if (totalQuantityToRemove === 0) {
            this.removeItemFromInventory(ii.Details);
          }
        }
      }
    });
  }

  addItemToInventory(itemToAdd, quantity = 1) {
    let item = this._Inventory.find((ii) => ii.Details.ID === itemToAdd.ID);
    if (!item) {
      this._Inventory.push(new InventoryItem(itemToAdd, quantity));
    } else {
      item.Quantity += quantity;
    }
  }

  removeItemFromInventory(itemToRemove, quantity = 1) {
    let item = this._Inventory.find((ii) => ii.Details.ID === itemToRemove.ID);
    if (!item) {
      // The item is not in the player's inventory, so ignore it.
    } else {
      item.Quantity -= quantity;

      if (item.Quantity < 0) {
        item.Quantity = 0;
      }

      if (item.Quantity === 0) {
        this._Inventory.splice(this._Inventory.indexOf(item), 1);
      }
    }
  }

  getQuantityOfItem(itemToFind) {
    let item = this._Inventory.find((ii) => ii.Details.ID === itemToFind.ID);

    if (item) {
      return item.Quantity;
    }
    return false;
  }

  markQuestCompleted(quest) {
    for (let pq of this.Quests) {
      if (pq.Details.ID === quest.ID) {
        pq.IsCompleted = true;

        return;
      }
    }
  }

  addQuest(location) {
    this._Quests.push(new PlayerQuest(location.QuestAvailableHere));
  }

  addQuestById(id, isCompleted) {
    this._Quests.push(new PlayerQuest(questByID(id), isCompleted));
  }

  experiencePointsForDefeatingAMonster() {
    return 60;
  }

  experiencePointsForCompletingQuest() {
    return 150;
  }

  strengthModifier() {
    return this._Level - 1 + 1;
  }

  intellectModifier() {
    return parseInt(this._Level / 3);
  }

  hasRequiredLevelToEnter(location) {
    if (location.LevelRequired === undefined) {
      return true;
    }

    if (this._Level >= location.LevelRequired) {
      return true;
    }

    return false;
  }

  get HasSlayWyrm() {
    return this._HasSlayWyrm;
  }

  set HasSlayWyrm(value) {
    this._HasSlayWyrm = value;
  }

  get Race() {
    return this._Race;
  }

  set Race(value) {
    this._Race = value;
  }
}
