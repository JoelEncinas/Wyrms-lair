import { Player } from "./Player.js";

// character stats
const hpText = document.getElementById("hit-points");
const goldText = document.getElementById("gold");
const experienceText = document.getElementById("experience");
const levelText = document.getElementById("level");

var player = new Player(10, 10, 0, 0, 1);

// set character stats
hpText.innerText = player.currentHitpoints;
goldText.innerText = player.gold;
experienceText.innerText = player.experience;
levelText.innerText = player.level;

console.log(player.currentHitpoints);
