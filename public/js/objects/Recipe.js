import { RecipeItem } from "./RecipeItem";

export class Recipe {
  constructor(name, recipeItemToTake, recipeItemToGive) {
    this._Name = name;
    this._RecipeItemToTake = recipeItemToTake;
    this._RecipeItemToGive = recipeItemToGive;
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
