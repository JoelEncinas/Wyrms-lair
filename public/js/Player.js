export class Player {
  constructor(currentHitpoints, maximumHitpoints, gold, experience, level) {
    this._currentHitpoints = currentHitpoints;
    this._maximumHitpoints = maximumHitpoints;
    this._gold = gold;
    this._experience = experience;
    this._level = level;
  }

  get currentHitpoints() {
    return this._currentHitpoints;
  }

  set currentHitpoints(currentHitpoints) {
    this._currentHitpoints = currentHitpoints;
  }

  get maximumHitpoints() {
    return this._maximumHitpoints;
  }

  set maximumHitpoints(maximumHitpoints) {
    this._maximumHitpoints = maximumHitpoints;
  }

  get gold() {
    return this._gold;
  }

  set gold(gold) {
    this._gold = gold;
  }

  get experience() {
    return this._experience;
  }

  set experience(experience) {
    this._experience = experience;
  }

  get level() {
    return this._level;
  }

  set level(level) {
    this._level = level;
  }
}
