export class LootItem {
  constructor(details, dropPercentage, isDefaultItem) {
    this._Details = details;
    this._DropPercentage = dropPercentage;
    this._IsDefaultItem = isDefaultItem;
  }

  get Details() {
    return this._Details;
  }

  set Details(value) {
    this._Details = value;
  }

  get DropPercentage() {
    return this._DropPercentage;
  }

  set DropPercentage(value) {
    this._DropPercentage = value;
  }

  get IsDefaultItem() {
    return this._IsDefaultItem;
  }

  set IsDefaultItem(value) {
    this._IsDefaultItem = value;
  }
}
