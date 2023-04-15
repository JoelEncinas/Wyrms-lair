import { InventoryItem } from "./InventoryItem.js";
import { itemByID, locationByID, LOCATION_IDS, ITEM_IDS } from "../world.js";

export class Vendor {
  constructor(name) {
    this._Name = name;
    this._Inventory = [];
  }

  get Inventory() {
    return this._Inventory;
  }

  addItemToInventory(item, quantity = 1) {
    for (let ii of this.Inventory) {
      if (ii.Details.ID === item.ID) {
        ii.Quantity++;

        return;
      }
    }

    this._Inventory.push(new InventoryItem(itemByID(item.ID), 1));
  }

  removeItemFromInventory(itemToRemove, quantity = 1) {
    let itemIndex = this.Inventory.findIndex(
      (ii) => ii.Details.ID === itemToRemove.ID
    );

    if (itemIndex === -1) {
      return false;
    } else {
      let item = this.Inventory[itemIndex];
      item.Quantity -= quantity;

      if (item.Quantity < 0) {
        item.Quantity = 0;
      }

      if (item.Quantity === 0) {
        this.Inventory.splice(itemIndex, 1);
      }

      return true;
    }
  }
}
