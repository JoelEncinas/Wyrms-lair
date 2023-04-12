// Wyrm's Lair

import { Player } from "./objects/Player.js";
import { items } from "./world.js";

// character stats
const hpText = document.getElementById("hit-points");
const goldText = document.getElementById("gold");
const experienceText = document.getElementById("experience");
const levelText = document.getElementById("level");

const player = new Player(10, 10, 20, 0, 1);

// set character stats
hpText.innerText = `${player.CurrentHitpoints} / ${player.MaximumHitpoints}`;
goldText.innerText = player.Gold;
experienceText.innerText = player.Experience;
levelText.innerText = player.Level;

console.log(items);
