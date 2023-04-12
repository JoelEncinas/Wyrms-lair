export class InventoryItem {
  constructor(details, quantity) {
    this._Details = details;
    this._Quantity = quantity;
  }

  get Details() {
    return this._Details;
  }

  set Details(value) {
    this._Details = value;
  }

  get Quantity() {
    return this._Quantity;
  }

  set Quantity(value) {
    this._Quantity = value;
  }
}
