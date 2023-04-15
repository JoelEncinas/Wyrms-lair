import { Item } from "./Item.js";

export class HealingPotion extends Item {
  constructor(id, name, namePlural, price, amountToHeal) {
    super(id, name, namePlural, price);
    this._AmountToHeal = amountToHeal;
  }

  get AmountToHeal() {
    return this._AmountToHeal;
  }

  set AmountToHeal(value) {
    this._AmountToHeal = value;
  }
}
