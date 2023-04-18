import { LivingCreature } from "./LivingCreature.js";
import { randomNumberGenerator } from "../utils/randomNumberGenerator.js";

export class Monster extends LivingCreature {
  constructor(
    id,
    name,
    minimumDamage,
    maximumDamage,
    rewardGold,
    currentHitPoints,
    maximumHitPoints,
    level,
    isPoisonous
  ) {
    super(currentHitPoints, maximumHitPoints);
    this._ID = id;
    this._Name = name;
    this._MinimumDamage = minimumDamage;
    this._MaximumDamage = maximumDamage;
    this._RewardGold = rewardGold;
    this._Level = level;
    this._LootTable = [];
    this._IsPoisonous = isPoisonous;
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

  set MinimumDamage(value) {
    this._MinimumDamage = value;
  }

  get MinimumDamage() {
    return this._MinimumDamage;
  }

  set MaximumDamage(value) {
    this._MaximumDamage = value;
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

  get Level() {
    return this._Level;
  }

  set Level(value) {
    this._Level = value;
  }

  get IsPoisonous() {
    return this._IsPoisonous;
  }

  set IsPoisonous(value) {
    this._IsPoisonous = value;
  }

  getDamageToPlayer() {
    return randomNumberGenerator(this._MinimumDamage, this._MaximumDamage);
  }
}
