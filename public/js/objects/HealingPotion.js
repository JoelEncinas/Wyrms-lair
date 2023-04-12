import { Item } from "./Item.js";

export class HealingPotion extends Item {
  constructor(id, name, namePlural, amountToHeal) {
    super(id, name, namePlural);
    this._AmountToHeal = amountToHeal;
  }

  get AmountToHeal() {
    return this._AmountToHeal;
  }

  set AmountToHeal(value) {
    this._AmountToHeal = value;
  }
}
