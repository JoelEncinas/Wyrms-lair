import { LivingCreature } from "./LivingCreature.js";

export class Player extends LivingCreature {
  constructor(currentHitpoints, maximumHitpoints, gold, experience, level) {
    super(maximumHitpoints, currentHitpoints);
    this._Gold = gold;
    this._Experience = experience;
    this._Level = level;
    this._Inventory = [];
    this._Quests = [];
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
}
