// TOP DOWN PLAYER
"use strict";

// Declare Global Variables
let game = new Boxes();

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(520, 800);
	// Initialize Global Variables
	tetrominos[0] = new OPiece();
	tetrominos[0].isDropping = true;
	game.build();
	game.nextPiece();
	game.score = 0;
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
	background(0);
	for (let i = 0; i < gameMap.length; i++) {
		fill(gameMap[i].col)
		rect(gameMap[i].x, gameMap[i].y, 40, 40);
	}
	game.lineClear();
	game.boxDetection();
	game.drawInterface();
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

// Load nextPiece images
function preload() {
	images.IPiece = loadImage('assets/tetrisI.png');
	images.JPiece = loadImage('assets/tetrisJ.png');
	images.LPiece = loadImage('assets/tetrisL.png');
	images.OPiece = loadImage('assets/tetrisO.png');
	images.SPiece = loadImage('assets/tetrisS.png');
	images.TPiece = loadImage('assets/tetrisT.png');
	images.ZPiece = loadImage('assets/tetrisZ.png');
}