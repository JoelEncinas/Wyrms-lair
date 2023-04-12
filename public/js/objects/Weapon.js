import { Item } from "./Item.js";

export class Weapon extends Item {
  constructor(id, name, namePlural, minimumDamage, maximumDamage) {
    super(id, name, namePlural);
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
}
