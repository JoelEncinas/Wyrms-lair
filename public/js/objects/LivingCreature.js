export class LivingCreature {
  constructor(maximumHitpoints, currentHitpoints) {
    this._maximumHitpoints = maximumHitpoints;
    this._currentHitpoints = currentHitpoints;
  }

  get maximumHitpoints() {
    return this._maximumHitpoints;
  }

  set maximumHitpoints(maximumHitpoints) {
    this._maximumHitpoints = maximumHitpoints;
  }

  get currentHitpoints() {
    return this._currentHitpoints;
  }

  set currentHitpoints(currentHitpoints) {
    this._currentHitpoints = currentHitpoints;
  }
}
