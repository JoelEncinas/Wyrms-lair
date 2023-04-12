export class LivingCreature {
  constructor(maximumHitpoints, currentHitpoints) {
    this._MaximumHitpoints = maximumHitpoints;
    this._CurrentHitpoints = currentHitpoints;
  }

  get MaximumHitpoints() {
    return this._MaximumHitpoints;
  }

  set MaximumHitpoints(value) {
    this._MaximumHitpoints = value;
  }

  get CurrentHitpoints() {
    return this._CurrentHitpoints;
  }

  set CurrentHitpoints(value) {
    this._CurrentHitpoints = value;
  }
}
