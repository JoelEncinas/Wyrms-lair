import { Item } from "./Item.js";

export class HealingPotion extends Item {
  constructor(id, name, namePlural, amountToHeal) {
    super(id, name, namePlural);
    this._amountToHeal = amountToHeal;
  }

  get amountToHeal() {
    return this._amountToHeal;
  }

  set amountToHeal(amountToHeal) {
    this._amountToHeal = amountToHeal;
  }
}
