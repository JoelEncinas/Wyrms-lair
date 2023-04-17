export class Region {
  constructor(id, name, description) {
    this._ID = id;
    this._Name = name;
    this._Description = description;
    this._Locations = [];
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

  get Locations() {
    return this._Locations;
  }

  addLocation(value) {
    this._Locations.push(value);
  }

  getRegionByLocationID(locationID) {
    let regionFound = this._Locations.some(
      (location) => location.ID === locationID
    );

    if (regionFound) {
      return this._Name;
    }

    return -1;
  }
}
