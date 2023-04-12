export class QuestCompletionItem {
  constructor(details, quantity) {
    this._details = details;
    this._quantity = quantity;
  }

  get details() {
    return this._details;
  }

  set details(details) {
    this._details = details;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(quantity) {
    this._quantity = quantity;
  }
}
