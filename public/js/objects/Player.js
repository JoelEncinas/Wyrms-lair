import { LivingCreature } from "./LivingCreature.js";

export class Player extends LivingCreature {
  constructor(currentHitpoints, maximumHitpoints, gold, experience, level) {
    super(maximumHitpoints, currentHitpoints);
    this._gold = gold;
    this._experience = experience;
    this._level = level;
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
}
