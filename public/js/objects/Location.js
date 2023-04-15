export class Location {
  constructor(
    id,
    name,
    description,
    itemToEnter,
    questAvailableHere,
    monsterLivingHere,
    locationToNorth,
    locationToEast,
    locationToSouth,
    locationToWest
  ) {
    this._ID = id;
    this._Name = name;
    this._Description = description;
    this._ItemToEnter = itemToEnter;
    this._QuestAvailableHere = questAvailableHere;
    this._MonsterLivingHere = monsterLivingHere;
    this._LocationToNorth = locationToNorth;
    this._LocationToEast = locationToEast;
    this._LocationToSouth = locationToSouth;
    this._LocationToWest = locationToWest;
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

  get Description() {
    return this._Description;
  }

  set Description(value) {
    this._Description = value;
  }

  get ItemToEnter() {
    return this._ItemToEnter;
  }

  set ItemToEnter(value) {
    this._ItemToEnter = value;
  }

  get QuestAvailableHere() {
    return this._QuestAvailableHere;
  }

  set QuestAvailableHere(value) {
    this._QuestAvailableHere = value;
  }

  get MonsterLivingHere() {
    return this._MonsterLivingHere;
  }

  set MonsterLivingHere(value) {
    this._MonsterLivingHere = value;
  }

  get LocationToNorth() {
    return this._LocationToNorth;
  }

  set LocationToNorth(value) {
    this._LocationToNorth = value;
  }

  get LocationToEast() {
    return this._LocationToEast;
  }

  set LocationToEast(value) {
    this._LocationToEast = value;
  }

  get LocationToSouth() {
    return this._LocationToSouth;
  }

  set LocationToSouth(value) {
    this._LocationToSouth = value;
  }

  get LocationToWest() {
    return this._LocationToWest;
  }

  set LocationToWest(value) {
    this._LocationToWest = value;
  }

  get VendorWorkingHere() {
    return this._VendorWorkingHere;
  }

  set VendorWorkingHere(value) {
    this._VendorWorkingHere = value;
  }
}
