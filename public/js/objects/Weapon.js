import { Item } from "./Item.js";

export class Weapon extends Item {
  constructor(id, name, namePlural, price, minimumDamage, maximumDamage) {
    super(id, name, namePlural, price);
    this._MinimumDamage = minimumDamage;
    this._MaximumDamage = maximumDamage;
  }

  get MinimumDamage() {
    return this._MinimumDamage;
  }

  set MinimumDamage(value) {
    this._MinimumDamage = value;
  }

  get MaximumDamage() {
    return this._MaximumDamage;
  }

  set MaximumDamage(value) {
    this._MaximumDamage = value;
  }

  getPhysicalDamage(strengthModifier) {
    let isCrit = Math.random() < 0.05 ? true : false;
    let damage =
      Math.floor(
        Math.random() * (this._MaximumDamage - this._MinimumDamage + 1)
      ) +
      this._MinimumDamage +
      strengthModifier;

    if (isCrit) {
      damage *= 2;
    }

    return { damage: damage, isCrit: isCrit };
  }
}
