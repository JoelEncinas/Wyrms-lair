export default class Location {
  locationToNorth;
  locationToEast;
  locationToSouth;
  locationToWest;

  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  get getId() {
    return this.id;
  }

  set setId(id) {
    this.name = id;
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  get getDescription() {
    return this.description;
  }

  set setDescription(description) {
    this.description = description;
  }

  get locationToNorth() {
    return this.locationToNorth;
  }

  set locationToNorth(location) {
    this.locationToNorth = location;
  }

  get locationToEast() {
    return this.locationToEast;
  }

  set locationToEast(location) {
    this.locationToEast = location;
  }

  get locationToSouth() {
    return this.locationToSouth;
  }

  set locationToSouth(location) {
    this.locationToSouth = location;
  }

  get locationToWest() {
    return this.locationToWest;
  }

  set locationToWest(location) {
    this.locationToWest = location;
  }
}
