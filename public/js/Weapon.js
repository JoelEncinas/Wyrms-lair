export class Weapon {
    constructor(id, name, namePlural, minimumDamage, maximumDamage) {
      this._id = id;
      this._name = name;
      this._namePlural = namePlural;
      this._minimumDamage = minimumDamage;
      this._maximumDamage = maximumDamage;
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
  
    get namePlural() {
      return this._namePlural;
    }
  
    set namePlural(namePlural) {
      this._namePlural = namePlural;
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
  