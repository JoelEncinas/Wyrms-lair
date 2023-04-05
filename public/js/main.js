// Test
import Character from "./characters/Character.js";

// UI
const playerNameText = $(".player-name");
const logText = $(".log");

const northBtn = $(".north");
const eastBtn = $(".east");
const southBtn = $(".south");
const westBtn = $(".west");

const eraseDataBtn = $(".erase-data");
const loadDataBtn = $(".load-data");

// Game data
let log = "";

// Utils
function addLine() {
  return "\n";
}

function addLog(text) {
  log += text;
  logText.html(log);
}

function clearData() {
  window.localStorage.clear();
}

eraseDataBtn.click(() => {
  clearData();
});

function saveData() {
  window.localStorage.setItem("log", log);
}

function loadData() {
  if (window.localStorage.getItem("log") !== null) {
    log = window.localStorage.getItem("log");
    logText.html(window.localStorage.getItem("log"));
  }
}

loadDataBtn.click(() => {
  loadData();
});

// Directions
const MOVE_NORTH = "North";
const MOVE_EAST = "East";
const MOVE_SOUTH = "South";
const MOVE_WEST = "West";

// Move Player
northBtn.click(() => {
  addLog(movePlayer(MOVE_NORTH));
});

eastBtn.click(() => {
  addLog(movePlayer(MOVE_EAST));
});

southBtn.click(() => {
  addLog(movePlayer(MOVE_SOUTH));
});

westBtn.click(() => {
  addLog(movePlayer(MOVE_WEST));
});

function movePlayer(direction) {
  saveData();
  return `To ${direction} ${addLine()}`;
}

let player = new Character("Jhon");
playerNameText.text(player.getName);
