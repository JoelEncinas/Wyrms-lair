import { InventoryItem } from "./InventoryItem.js";

export class Vendor {
  constructor(name) {
    this._Name = name;
    this._Inventory = [];
  }

  get Name() {
    return this._Name;
  }

  set Name(value) {
    this._Name = value;
  }

  get Inventory() {
    return this._Inventory;
  }

  addItemToInventory(itemToAdd, quantity = 1) {
    let item = this._Inventory.find((ii) => ii.Details.ID === itemToAdd.ID);
    if (!item) {
      this._Inventory.push(new InventoryItem(itemToAdd, quantity));
    } else {
      item.Quantity += quantity;
    }
  }

  removeItemFromInventory(itemToRemove, quantity = 1) {
    let item = this._Inventory.find((ii) => ii.Details.ID === itemToRemove.ID);
    if (!item) {
      // The item is not in the player's inventory, so ignore it.
    } else {
      item.Quantity -= quantity;

      if (item.Quantity < 0) {
        item.Quantity = 0;
      }

      if (item.Quantity === 0) {
        this._Inventory.splice(this._Inventory.indexOf(item), 1);
      }
    }
  }
}
