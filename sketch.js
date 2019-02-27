// TOP DOWN PLAYER
"use strict";

// Declare Global Variables
let game = new Boxes();

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(400, 800);
	// Initialize Global Variables
	tetrominos[0] = new OPiece();
	tetrominos[0].isDropping = true;
	game.build();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
	background(255);
	for (let i = 0; i < gameMap.length; i++) {
		fill(gameMap[i].col)
		rect(gameMap[i].x, gameMap[i].y, 40, 40);
	}
	game.lineClear();
	game.boxDetection();
	for (let i = tetrominos.length - 1; i >= 0; i--) {
		tetrominos[i].show();
		if (tetrominos[i].isPlaced == false) {
			tetrominos[i].moveLogic();
		}
		if (tetrominos[i].isDropping == true) {
			tetrominos[i].isPlaced = false;
		}
	}
}

function keyPressed() {
	for (let i = tetrominos.length - 1; i >= 0; i--) {
		if (tetrominos[i].isDropping == true) {
			tetrominos[i].rotate();
			tetrominos[i].moveSide();
		}
	}
}