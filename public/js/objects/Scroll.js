import { Item } from "./Item.js";
import { randomNumberGenerator } from "../utils/randomNumberGenerator.js";

export class Scroll extends Item {
  constructor(
    id,
    name,
    namePlural,
    price,
    minimumDamage,
    maximumDamage,
    spellType,
    spellName
  ) {
    super(id, name, namePlural, price);
    this._MinimumDamage = minimumDamage;
    this._MaximumDamage = maximumDamage;
    this._SpellType = spellType;
    this._SpellName = spellName;
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

  get SpellName() {
    return this._SpellName;
  }

  set SpellName(value) {
    this._SpellName = value;
  }

  getMagicalDamage(intellectModifier) {
    return (
      randomNumberGenerator(this._MinimumDamage, this._MaximumDamage) +
      intellectModifier
    );
  }
}
