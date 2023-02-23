$(document).ready(function () {
  console.log("loaded");

  // location
  let location_img = $("#location-img");
  let location_text = $("#location-text");

  // player stats
  let player_name = $("#player-name");
  let player_level = $("#player-level");
  let player_health = $("#player-health");
  let player_attack = $("#player-attack");

  // enemy
  let enemy_name = $("#enemy-name");
  let enemy_level = $("#enemy-level");
  let enemy_health = $("#enemy-health");
  let enemy_attack = $("#enemy-attack");

  // log
  let log = $("#log");

  // quests
  let quests = $("quests-container");

  // controls
  let north = $("north");
  let south = $("south");
  let west = $("west");
  let east = $("east");
  let attack = $("attack");
  let flee = $("flee");

  // inventory
  let inventory = $("inventory-container");

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

  // test player
  player = new Character("Gerard", 1, 10, 2);

  // test enemy
  enemy = new Character("Bug", 3, 14, 3);

  function showPlayerStats() {
    player_name.text(`${player._name}`);
    player_level.text(`${player._level}`);
    player_health.text(`${player._health} / ${player._maxHeath}`);
    player_attack.text(`${player._attack}`);
  }

  showPlayerStats();

  function showEnemyStats() {
    enemy_name.text(`${enemy._name}`);
    enemy_level.text(`${enemy._level}`);
    enemy_health.text(`${enemy._health} / ${enemy._maxHeath}`);
    enemy_attack.text(`${enemy._attack}`);
  }

  showEnemyStats();
});
