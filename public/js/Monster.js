export class Monster {
  constructor(
    id,
    name,
    maximumHitpoints,
    currentHitpoints,
    maximumDamage,
    rewardExperiencePoints,
    rewardGold
  ) {
    this._id = id;
    this._name = name;
    this._maximumHitpoints = maximumHitpoints;
    this._currentHitpoints = currentHitpoints;
    this._maximumDamage = maximumDamage;
    this._rewardExperiencePoints = rewardExperiencePoints;
    this._rewardGold = rewardGold;
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

  get maximumDamage() {
    return this._maximumDamage;
  }

  set maximumDamage(maximumDamage) {
    this._maximumDamage = maximumDamage;
  }

  get rewardExperiencePoints() {
    return this._rewardExperiencePoints;
  }

  set rewardExperiencePoints(rewardExperiencePoints) {
    this._rewardExperiencePoints = rewardExperiencePoints;
  }

  get rewardGold() {
    return this._rewardGold;
  }

  set rewardGold(rewardGold) {
    this._rewardGold = rewardGold;
  }
}
