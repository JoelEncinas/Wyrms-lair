import { Item } from "./Item.js";

export class Scroll extends Item {
  constructor(
    id,
    name,
    namePlural,
    price,
    minimumDamage,
    maximumDamage,
    spellType
  ) {
    super(id, name, namePlural, price);
    this._MinimumDamage = minimumDamage;
    this._MaximumDamage = maximumDamage;
    this._SpellType = spellType;
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

  get SpellType() {
    return this._SpellType;
  }

  set SpellType(value) {
    this._SpellType = value;
  }
}
