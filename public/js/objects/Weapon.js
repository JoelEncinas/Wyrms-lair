export class Weapon {
  constructor(id, name, namePlural, minimumDamage, maximumDamage) {
    super(id, name, namePlural);
    this._minimumDamage = minimumDamage;
    this._maximumDamage = maximumDamage;
  }

  get minimumDamage() {
    return this._minimumDamage;
  }

  set minimumDamage(minimumDamage) {
    this._minimumDamage = minimumDamage;
  }

  get maximumDamage() {
    return this._maximumDamage;
  }

  set maximumDamage(maximumDamage) {
    this._maximumDamage = maximumDamage;
  }
}
