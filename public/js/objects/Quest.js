export class Quest {
  constructor(id, name, description, rewardExperiencePoints, rewardGold) {
    this._ID = id;
    this._Name = name;
    this._Description = description;
    this._RewardExperiencePoints = rewardExperiencePoints;
    this._RewardGold = rewardGold;
    this._RewardItems = [];
    this._QuestCompletionItems = [];
  }

  get ID() {
    return this._ID;
  }

  set ID(value) {
    this._ID = value;
  }

  get Name() {
    return this._Name;
  }

  set Name(value) {
    this._Name = value;
  }

  get Description() {
    return this._Description;
  }

  set Description(value) {
    this._Description = value;
  }

  get RewardExperiencePoints() {
    return this._RewardExperiencePoints;
  }

  set RewardExperiencePoints(value) {
    this._RewardExperiencePoints = value;
  }

  get RewardGold() {
    return this._RewardGold;
  }

  set RewardGold(value) {
    this._RewardGold = value;
  }

  get RewardItems() {
    return this._RewardItems;
  }

  set RewardItems(value) {
    this._RewardItems = value;
  }

  addRewardItems(item) {
    this._RewardItems.push(item);
  }

  get QuestCompletionItems() {
    return this._QuestCompletionItems;
  }

  set QuestCompletionItems(value) {
    this._QuestCompletionItems = value;
  }
}
