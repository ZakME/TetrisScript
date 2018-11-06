// TOP DOWN PLAYER
"use strict";
tetrominos[0] = new TPiece();
// Declare Global Variables
let game = new Boxes();

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(400, 800);

	// Initialize Global Variables
	game.build();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
	background(255);
	
	game.boxDetection();
	for (let i = 0; i < gameMap.length; i++) {
		fill(gameMap[i].col)
		rect(gameMap[i].x, gameMap[i].y, 40, 40);
	}
	tetrominos[0].show();
}

function keyPressed() {
	tetrominos[0].rotate();
	tetrominos[0].move();
}