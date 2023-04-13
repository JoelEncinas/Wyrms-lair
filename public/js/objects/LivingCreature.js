export class LivingCreature {
  constructor(maximumHitPoints, currentHitPoints) {
    this._MaximumHitPoints = maximumHitPoints;
    this._CurrentHitPoints = currentHitPoints;
  }

  get MaximumHitPoints() {
    return this._MaximumHitPoints;
  }

  set MaximumHitPoints(value) {
    this._MaximumHitPoints = value;
  }

  get CurrentHitPoints() {
    return this._CurrentHitPoints;
  }

  set CurrentHitPoints(value) {
    this._CurrentHitPoints = value;
  }
}
