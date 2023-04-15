export class Item {
  constructor(id, name, namePlural, price) {
    this._ID = id;
    this._Name = name;
    this._NamePlural = namePlural;
    this._Price = price
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

  get NamePlural() {
    return this._NamePlural;
  }

  set NamePlural(value) {
    this._NamePlural = value;
  }

  get Price() {
    return this._Price;
  }

  set Price(value) {
    this._Price = value;
  }
}
