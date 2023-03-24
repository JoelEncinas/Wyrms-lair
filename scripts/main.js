// Test
import number from './test.js';
import { url, myFunc } from "./test.js";

console.log(url);
console.log(number);

// UI
const logText = $('.log');

const northBtn = $('.north');
const eastBtn = $('.east');
const southBtn = $('.south');
const westBtn = $('.west');

// Game data
let log = '';

// Utils
function addLine(){
    return '\n';
}

function addLog(text){
    log += text;
    logText.html(log);
}

const MOVE_NORTH = 'North';
const MOVE_EAST = 'East';
const MOVE_SOUTH = 'South';
const MOVE_WEST = 'West';

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

function movePlayer(direction){
    return `To ${direction} ${addLine()}`;
}

