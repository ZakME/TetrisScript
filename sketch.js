// TOP DOWN PLAYER
"use strict";

// Declare Global Variables
let game = new Boxes();

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(400, 800);
	// Initialize Global Variables
	tetrominos[0] = new OPiece();
	game.build();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
	background(255);
	for (let i = 0; i < gameMap.length; i++) {
		fill(gameMap[i].col)
		rect(gameMap[i].x, gameMap[i].y, 40, 40);
	}
	game.boxDetection();
	game.lineClear();
	for (let i = tetrominos.length - 1; i >= 0; i--) {
		tetrominos[i].show();
		if (tetrominos[i].isPlaced == false) {
			tetrominos[i].moveLogic();
		}
	}
}

function keyPressed() {
	for (let i = tetrominos.length - 1; i >= 0; i--) {
		if (tetrominos[i].isPlaced == false) {
			tetrominos[i].rotate();
			tetrominos[i].moveSide();
		}
	}
}