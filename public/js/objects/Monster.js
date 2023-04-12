import { LivingCreature } from "./LivingCreature.js";

export class Monster extends LivingCreature {
  constructor(id, name, maximumDamage, rewardExperiencePoints, rewardGold, currentHitPoints, maximumHitPoints) {
      super(currentHitPoints, maximumHitPoints);
      this._ID = id;
      this._Name = name;
      this._MaximumDamage = maximumDamage;
      this._RewardExperiencePoints = rewardExperiencePoints;
      this._RewardGold = rewardGold;
      this._LootTable = [];
  }

  get ID() {
      return this._ID;
  }

  set ID(value) {
      this._ID = value;
  }

  get Name() {
      return this._Name;
  }

  set Name(value) {
      this._Name = value;
  }

  get MaximumDamage() {
      return this._MaximumDamage;
  }

  set MaximumDamage(value) {
      this._MaximumDamage = value;
  }

  get RewardExperiencePoints() {
      return this._RewardExperiencePoints;
  }

  set RewardExperiencePoints(value) {
      this._RewardExperiencePoints = value;
  }

  get RewardGold() {
      return this._RewardGold;
  }

  set RewardGold(value) {
      this._RewardGold = value;
  }

  get LootTable() {
      return this._LootTable;
  }

  set LootTable(value) {
      this._LootTable = value;
  }
}
