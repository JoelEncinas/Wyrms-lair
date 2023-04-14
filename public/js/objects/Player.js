import { LivingCreature } from "./LivingCreature.js";
import { InventoryItem } from "./InventoryItem.js";
import { itemByID } from "../world.js";

export class Player extends LivingCreature {
  constructor(
    currentHitPoints,
    maximumHitPoints,
    gold,
    experience,
    level,
    currentLocation,
    currentWeapon,
    currentPotion
  ) {
    super(maximumHitPoints, currentHitPoints);
    this._Gold = gold;
    this._Experience = experience;
    this._Level = level;
    this._Inventory = [];
    this._Quests = [];
    this._CurrentLocation = currentLocation;
    this._CurrentWeapon = currentWeapon;
    this._CurrentPotion = currentPotion;
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

  get Level() {
    return parseInt(this._Experience / 40 + 1);
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

  hasRequiredItemToEnter(location) {
    if (location.ItemToEnter === undefined) {
      return true;
    }

    for (let ii of this.Inventory) {
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

  HasAllQuestCompletionItems(quest) {
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

  RemoveQuestCompletionItems(quest) {
    quest.QuestCompletionItems.forEach((qci) => {
      let matchingInventoryItems = this.Inventory.filter(
        (ii) => ii.Details.ID === qci.Details.ID
      );
      if (matchingInventoryItems.length > 0) {
        let totalQuantityToRemove = qci.Quantity;
        for (let ii of matchingInventoryItems) {
          let quantityToRemove = Math.min(ii.Quantity, totalQuantityToRemove);
          ii.Quantity -= quantityToRemove;
          totalQuantityToRemove -= quantityToRemove;
          if (totalQuantityToRemove === 0) {
            break;
          }
        }
      }
    });
  }

  AddItemToInventory(item) {
    for (let ii of this.Inventory) {
      if (ii.Details.ID === item.ID) {
        ii.Quantity++;

        return;
      }
    }

    this._Inventory.push(new InventoryItem(itemByID(item.ID), 1));
  }

  MarkQuestCompleted(quest) {
    for (let pq of this.Quests) {
      if (pq.Details.ID === quest.ID) {
        pq.IsCompleted = true;

        return;
      }
    }
  }
}
