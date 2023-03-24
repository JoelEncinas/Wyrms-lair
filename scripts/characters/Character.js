export default class Character {
  constructor(name) {
    this.name = name;
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }
}
