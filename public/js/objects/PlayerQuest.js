export class PlayerQuest {
  constructor(details) {
    this._details = details;
    this._isCompleted = false;
  }

  get details() {
    return this._details;
  }

  set details(details) {
    this._details = details;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  set isCompleted(isCompleted) {
    this._isCompleted = isCompleted;
  }
}
