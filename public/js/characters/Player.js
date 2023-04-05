import Character from "./Character";

export default class Player extends Character {
  location;
  constructor(name) {
    super(name);
  }

  get location() {
    return this.location;
  }

  set location(location){
    this.location = location;
  }
}
