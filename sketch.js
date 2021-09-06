// TOP DOWN PLAYER
"use strict";
let game = new Boxes();


// Declare Global Variables

// Load nextPiece images
function preload() {
	game.images.IPiece = loadImage('assets/tetrisI.png');
	game.images.JPiece = loadImage('assets/tetrisJ.png');
	game.images.LPiece = loadImage('assets/tetrisL.png');
	game.images.OPiece = loadImage('assets/tetrisO.png');
	game.images.SPiece = loadImage('assets/tetrisS.png');
	game.images.TPiece = loadImage('assets/tetrisT.png');
	game.images.ZPiece = loadImage('assets/tetrisZ.png');
}

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
	createCanvas(520, 800);
	frameRate(30);
	// Initialize Global Variables
	game.nextPieceF();
	game.createPiece();
	// Init the gameMap
	game.build();
	// Give us a next piece
	game.nextPieceF();
	//Optimization
	game.optimizeTetromino();
	// Set score
	game.score = 0;
}

// DRAW FUNCTION - Loops @ 30fps rather than 60 for performance
function draw() {
	background(0);
	//If were starting, draw the start screen
	if (game.gameState == "start") {
		game.drawStartScreen();
	// if we click start, get the game going
	} else if (game.gameState == "gameOn") {
		// Draw the rectangle grid (this might also done somwhere else as well..)
		for (let i = 0; i < game.gameMap.length; i++) {
			fill(game.gameMap[i].col)
			rect(game.gameMap[i].x, game.gameMap[i].y, 40, 40);
		}
		// Box detection function
		game.boxDetection();
		// Draw the "NEXT" box and score counter
		game.drawInterface();
		// Run line clearing logic
		game.lineClear();
		// Optimaztion because i realized it's never actually being run...
		game.optimizeTetromino();
		// Draw the tetrominos. If a tetromino is not placed, move it down screen using moveLogic
		for (let i = game.tetrominos.length - 1; i >= 0; i--) {
			game.tetrominos[i].show();
			if (game.tetrominos[i].isPlaced == false) {
				game.tetrominos[i].moveLogic();
			}
			if (game.tetrominos[i].isDropping == true) {
				game.tetrominos[i].isPlaced = false;
			}
		}
	// If you lose, draw the gameover screen.
	} else if (game.gameState == "gameOver") {
		game.drawGameOver();
	}


}

function keyPressed() {
	// If a tetromino is dropping, let the user move it and rotate it

	// A frame perfect tap on the down button can cause a tetromino to fall through another tetromino if
	// it is tapped on the same frame that moveLogic is called (which is called every 30? frames)
	for (let i = game.tetrominos.length - 1; i >= 0; i--) {
		if (game.tetrominos[i].isDropping == true) {
			game.tetrominos[i].rotate();
			game.tetrominos[i].moveSide();
		}
	}
}

function mousePressed() {
	if (game.gameState == "start") {
		game.gameState = "gameOn";
	} else if (game.gameState == "gameOver") {
		setup();
		game.gameState = "start";
	}
}
