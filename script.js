$(document).ready(function () {
  console.log("loaded");

  // location
  let location_img = $("#location-img");
  let location_text = $("#location-text");

  // elements
  let player_stats = $("#player");
  let log = $("#log");
  let enemy = $("#enemy");
  let quests = $("#quests");
  let controls = $("#controls");
  let inventory = $("#inventory");

  // stats
  let player_name = $("#player-name");
  let player_level = $("#player-level");
  let player_health = $("#player-health");
  let player_attack = $("#player-attack");

  class Character {
    constructor(name, level, health, attack) {
      this._name = name;
      this._level = level;
      this._health = health;
      this._maxHeath = health;
      this._attack = attack;
    }

    get name() {
      return this._name;
    }

    set name(name) {
      this._name = name;
    }

    get level() {
      return this._level;
    }

    set level(level) {
      this._level = level;
    }

    get health() {
      return this._health;
    }

    set health(health) {
      this._health = health;
    }

    get maxHealth() {
      return this._maxHeath;
    }

    set maxHealth(health) {
      this._maxHeath = health;
    }

    get attack() {
      return this._attack;
    }

    set attack(attack) {
      this._attack = attack;
    }
  }

  // player
  player = new Character("Gerard", 1, 10, 2);

  function showStats() {
    player_name.text(`${player._name}`);
    player_level.text(`${player._level}`);
    player_health.text(`${player._health} / ${player._maxHeath}`);
    player_attack.text(`${player._attack}`);
  }

  showStats();
});
