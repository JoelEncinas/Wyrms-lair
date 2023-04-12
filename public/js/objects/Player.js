import { LivingCreature } from "./LivingCreature.js";

export class Player extends LivingCreature {
  constructor(currentHitpoints, maximumHitpoints, gold, experience, level) {
    super(maximumHitpoints, currentHitpoints);
    this._gold = gold;
    this._experience = experience;
    this._level = level;
    this._inventory = [];
    this._quests = [];
  }

  get gold() {
    return this._gold;
  }

  set gold(gold) {
    this._gold = gold;
  }

  get experience() {
    return this._experience;
  }

  set experience(experience) {
    this._experience = experience;
  }

  get level() {
    return this._level;
  }

  set level(level) {
    this._level = level;
  }

  get inventory() {
    return this._inventory;
  }

  set inventory(_inventory) {
    this._inventory = inventory;
  }

  get quests() {
    return this._quests;
  }

  set quests(quests) {
    this._quests = quests;
  }
}
