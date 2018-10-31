// TOP DOWN PLAYER
"use strict";

// Declare Global Variables
let lpiece = new TPiece();
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
	lpiece.show();
	lpiece.move();
}

function keyPressed() {
	lpiece.rotate();
}
