import { LivingCreature } from "./LivingCreature.js";

export class Monster extends LivingCreature {
  constructor(
    id,
    name,
    maximumHitpoints,
    currentHitpoints,
    maximumDamage,
    rewardExperiencePoints,
    rewardGold
  ) {
    super(maximumHitpoints, currentHitpoints);
    this._id = id;
    this._name = name;
    this._maximumDamage = maximumDamage;
    this._rewardExperiencePoints = rewardExperiencePoints;
    this._rewardGold = rewardGold;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get maximumDamage() {
    return this._maximumDamage;
  }

  set maximumDamage(maximumDamage) {
    this._maximumDamage = maximumDamage;
  }

  get rewardExperiencePoints() {
    return this._rewardExperiencePoints;
  }

  set rewardExperiencePoints(rewardExperiencePoints) {
    this._rewardExperiencePoints = rewardExperiencePoints;
  }

  get rewardGold() {
    return this._rewardGold;
  }

  set rewardGold(rewardGold) {
    this._rewardGold = rewardGold;
  }
}
