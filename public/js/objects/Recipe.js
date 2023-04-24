export class Recipe {
  constructor(id, name, recipeItemToTake, recipeItemToGive) {
    this._ID = id;
    this._Name = name;
    this._RecipeItemToTake = recipeItemToTake;
    this._RecipeItemToGive = recipeItemToGive;
  }

  get ID() {
    return this._ID;
  }

  set ID(value) {
    this._ID = value;
  }

  get Name() {
    return this._Name;
  }

  set Name(value) {
    this._Name = value;
  }

  get RecipeItemToTake() {
    return this._RecipeItemToTake;
  }

  set RecipeItemToTake(value) {
    this._RecipeItemToTake = value;
  }

  get RecipeItemToGive() {
    return this._RecipeItemToGive;
  }

  set RecipeItemToGive(value) {
    this._RecipeItemToGive = value;
  }
}
