export class Craft {
  constructor(name, recipe) {
    this._Name = name;
    this._Recipe = recipe;
  }

  get Name() {
    return this._Name;
  }

  set Name(value) {
    this._Name = value;
  }

  get Recipe() {
    return this._Recipe;
  }

  set Recipe(value) {
    this._Recipe = value;
  }
}
