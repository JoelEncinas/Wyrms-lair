export class LootItem {
  constructor(details, dropPercentage, isDefaultItem) {
    this._details = details;
    this._dropPercentage = dropPercentage;
    this._isDefaultItem = isDefaultItem;
  }

  get details() {
    return this._details;
  }

  set details(details) {
    this._details = details;
  }

  get dropPercentage() {
    return this._dropPercentage;
  }

  set dropPercentage(dropPercentage) {
    this._dropPercentage = dropPercentage;
  }

  get isDefaultItem() {
    return this._isDefaultItem;
  }

  set isDefaultItem(isDefaultItem) {
    this._isDefaultItem = isDefaultItem;
  }
}
