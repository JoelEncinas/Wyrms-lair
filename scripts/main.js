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

// Functionality
northBtn.click(() => {
    addLog(movePlayer(MOVE_NORTH));

});

function movePlayer(direction){
    return `To ${direction} ${addLine()}`;
}

