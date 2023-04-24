export class PlayerQuest {
  constructor(details, isCompleted = false) {
    this._Details = details;
    this._IsCompleted = isCompleted;
  }

  get Details() {
    return this._Details;
  }

  set Details(value) {
    this._Details = value;
  }

  get IsCompleted() {
    return this._IsCompleted;
  }

  set IsCompleted(value) {
    this._IsCompleted = value;
  }
}
