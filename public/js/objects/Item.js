export class Item {
  constructor(id, name, namePlural) {
    this._id = id;
    this._name = name;
    this._namePlural = namePlural;
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

  get namePlural() {
    return this._namePlural;
  }

  set namePlural(namePlural) {
    this._namePlural = namePlural;
  }
}
