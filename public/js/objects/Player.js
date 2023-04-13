import { LivingCreature } from "./LivingCreature.js";

export class Player extends LivingCreature {
  constructor(
    currentHitPoints,
    maximumHitPoints,
    gold,
    experience,
    level,
    currentLocation
  ) {
    super(maximumHitPoints, currentHitPoints);
    this._Gold = gold;
    this._Experience = experience;
    this._Level = level;
    this._Inventory = [];
    this._Quests = [];
    this._CurrentLocation = currentLocation;
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
    return this._Level;
  }

  set Level(value) {
    this._Level = value;
  }

  get Inventory() {
    return this._Inventory;
  }

  set Inventory(value) {
    this._Inventory = value;
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
    return this._Quests.some(
      (playerQuest) => playerQuest.Details.ID === quest.ID
    );
  }

  hasCompletedThisQuest(quest) {
    const completedQuest = this._Quests.find(
      (playerQuest) => playerQuest.Details.ID === quest.ID
    );
    return completedQuest ? completedQuest.IsCompleted : false;
  }
}
