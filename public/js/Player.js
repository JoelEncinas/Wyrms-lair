export class Player {
  constructor(currentHitpoints) {
    this._currentHitpoints = currentHitpoints;
  }

  get currentHitpoints() {
    return this._currentHitpoints;
  }

  set currentHitpoints(currentHitpoints) {
    this._currentHitpoints = currentHitpoints;
  }
}
