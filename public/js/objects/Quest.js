export class Quest {
  constructor(id, name, description, rewardExperiencePoints, rewardGold) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._rewardExperiencePoints = rewardExperiencePoints;
    this._rewardGold = rewardGold;
    this._rewardItem = rewardItem;
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

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
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

  get rewardItem() {
    return this._rewardItem;
  }

  set rewardItem(rewardItem) {
    this._rewardItem = rewardItem;
  }
}
