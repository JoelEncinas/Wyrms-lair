export class Location {
  constructor(id, name, description) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._itemToEnter = itemToEnter;
    this._questAvailableHere = questAvailableHere;
    this._monsterLivingHere = monsterLivingHere;
    this._locationToNorth = locationToNorth;
    this._locationToEast = locationToEast;
    this._locationToSouth = locationToSouth;
    this._locationToWest = locationToWest;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get itemToEnter() {
    return this._itemToEnter;
  }

  set itemToEnter(itemToEnter) {
    this._itemToEnter = itemToEnter;
  }

  get questAvailableHere() {
    return this._questAvailableHere;
  }

  set questAvailableHere(questAvailableHere) {
    this._questAvailableHere = questAvailableHere;
  }

  get monsterLivingHere() {
    return this._monsterLivingHere;
  }

  set monsterLivingHere(monsterLivingHere) {
    this._monsterLivingHere = monsterLivingHere;
  }

  get locationToNorth() {
    return this._locationToNorth;
  }

  set locationToNorth(locationToNorth) {
    this._locationToNorth = locationToNorth;
  }

  get locationToEast() {
    return this._locationToEast;
  }

  set locationToEast(locationToEast) {
    this._locationToEast = locationToEast;
  }

  get locationToSouth() {
    return this._locationToSouth;
  }

  set locationToSouth(locationToSouth) {
    this._locationToSouth = locationToSouth;
  }

  get locationToWest() {
    return this._locationToWest;
  }

  set locationToWest(locationToWest) {
    this._locationToWest = locationToWest;
  }
}
