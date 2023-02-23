$(document).ready(function () {
    console.log("loaded");

    // location
    let location_img = $("#location-img")
    let location_text = $("#location-text")

    // elements
    let player_stats = $("#player")
    let log = $("#log")
    let enemy = $("#enemy")
    let quests = $("#quests")
    let controls = $("#controls")
    let inventory = $("#inventory")

    class Character {
        constructor(level, health, attack) {
            this._level = level;
            this._health = health;
            this._attack = attack;
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

        get attack() {
            return this._attack;
        }

        set attack(attack) {
            this._attack = attack;
        }
    }

    // player
    player = new Character(1, 10, 2)
    let player_stats_list = $(
        `<ul>
            <li>${player._level}</li>
            <li>${player._health}</li>
            <li>${player._attack}</li>
        </ul>`)


    player_stats.append(player_stats_list);
}
);