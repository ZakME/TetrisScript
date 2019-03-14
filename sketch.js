// TOP DOWN PLAYER
"use strict";

// Declare Global Variables
let game = new Boxes();
// Hammertime mobile library testing
var hammertime = new Hammer("hammerBody");
hammertime.get('swipe').set({ direction: Hammer.DIRETION_ALL });
hammertime.on('swipe', function() {
	alert("hammer working");
})
// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(520, 800);
	// Initialize Global Variables
	tetrominos[0] = new OPiece();
	tetrominos[0].isDropping = true;
	// Init the gameMap
	game.build();
	// Give us a next piece
	game.nextPiece();
	// Set score
	game.score = 0;
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
	background(0);
	// Draw the rectangle grid (this might also done somwhere else as well..)
	for (let i = 0; i < gameMap.length; i++) {
		fill(gameMap[i].col)
		rect(gameMap[i].x, gameMap[i].y, 40, 40);
	}
	// Run our line clearing funtion and our collision detection function
	game.lineClear();
	game.boxDetection();
	// Draw the "NEXT" box and score counter
	game.drawInterface();
	// Draw the tetrominos. If a tetromino is not placed, move it down screen using moveLogic
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
	// If a tetromino is dropping, let the user move it and rotate it

	// A frame perfect tap on the down button can cause a tetromino to fall through another tetromino if
	// it is tapped on the same frame that moveLogic is called (which is called every 30? frames)
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