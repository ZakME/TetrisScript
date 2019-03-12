"use strict";
// declare globals =/
let tetrominos = [];
let gameMap = [];
let nextPiece;
let nextImage;
let images = {};

// Call the class boxes but its pretty much the whole game
class Boxes {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 40;
        this.h = 40;
        this.boxUsed = false;
        this.stop = false;
        this.score = 0;
    }

    // Runs code for placing a piece, cleans up code
    placePiece() {
        this.createPiece();
        this.nextPiece();
        // Add score for placing. 36 because why not
        this.score += 36;
    }

    // All the collision detection for the tetrominos.
    boxDetection() {
        // For loop, loops through all spaces on the game board
        for (let i = gameMap.length - 1; i >= 0; i--) {
            // For loop, loops through all tetrominos for collision detection on a piece of the game board
            for (let z = tetrominos.length - 1; z >= 0; z--) {
                // Check for an intersection between a piece and a board square
                if (rectIntersect1(tetrominos[z], gameMap[i]) || rectIntersect2(tetrominos[z], gameMap[i]) ||
                    rectIntersect3(tetrominos[z], gameMap[i]) || rectIntersect4(tetrominos[z], gameMap[i])) {
                    // First case, tetromino hits bottom of board, Check coords and if the tetromino
                    // is dropping or placed
                    if (tetrominos[z].y1 == height - 40 && tetrominos[z].isPlaced == false ||
                        tetrominos[z].y2 == height - 40 && tetrominos[z].isPlaced == false ||
                        tetrominos[z].y3 == height - 40 && tetrominos[z].isPlaced == false ||
                        tetrominos[z].y4 == height - 40 && tetrominos[z].isPlaced == false) {
                        // Place the dropping tetromino, create a new one
                        tetrominos[z].isPlaced = true;
                        tetrominos[z].isDropping = false;
                        this.placePiece();
                    // Second case, tetromino lands on another tetromino, check if theres is a tetromino
                    // present underneath the dropping tetromino by checking 10 spaces ahead of dropping
                    // tetrominos coords
                    } else if (tetrominos[z].isPlaced == false && tetrominos[z].y1 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true ||
                        tetrominos[z].isPlaced == false && tetrominos[z].y2 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true || tetrominos[z].isPlaced == false &&
                        tetrominos[z].y3 + 40 == gameMap[i + 10].y && gameMap[i + 10].boxUsed == true ||
                        tetrominos[z].isPlaced == false && tetrominos[z].y4 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true) {
                        // Place the dropping tetromino, create a new one
                        tetrominos[z].isPlaced = true;
                        tetrominos[z].isDropping = false;
                        this.placePiece();
                    }
                    // After placing the tetromino with either case, set the squares the tetromino is
                    // placed on to used
                    if (tetrominos[z].isPlaced == true) {
                        gameMap[i].boxUsed = true;
                    }
                    // Check if a piece lands and is above the game board and reset game
                    if (tetrominos[z].isPlaced == true && tetrominos[z].y1 == 0 ||
                        tetrominos[z].isPlaced == true && tetrominos[z].y2 == 0 ||
                        tetrominos[z].isPlaced == true && tetrominos[z].y3 == 0 ||
                        tetrominos[z].isPlaced == true && tetrominos[z].y4 == 0) {
                        // Reset the game.
                        tetrominos = [];
                        gameMap = [];
                        setup();
                        // Reset z variable instead of changing loops because lazy
                        z = tetrominos.length;
                    }
                }
            }
        }
    }

    lineClear() {
        // Iterate through each line of the game map
        for (let i = 0; i < gameMap.length; i += 10) {
            // Check to see if a line is completely filled with tetrominos
            if (gameMap[i].boxUsed == true && gameMap[i + 1].boxUsed == true && gameMap[i + 2].boxUsed == true &&
                gameMap[i + 3].boxUsed == true && gameMap[i + 4].boxUsed == true &&
                gameMap[i + 5].boxUsed == true && gameMap[i + 6].boxUsed == true &&
                gameMap[i + 7].boxUsed == true && gameMap[i + 8].boxUsed == true &&
                gameMap[i + 9].boxUsed == true) {
                // Push the line off screen
                // BUG - can't clear lines properly in the middle of the screen. This is because
                // the clear works by pushing the lines off screen and off of the game map. A line in the
                // middle of the screen can't by pushed to the bottom without taking everything else with it.
                // (yet)
                for (let z = 0; z < tetrominos.length; z++) {
                    if (tetrominos[z].y1 < gameMap[i].y || tetrominos[z].y2 < gameMap[i].y ||
                        tetrominos[z].y3 < gameMap[i].y || tetrominos[z].y4, gameMap[i].y) {
                        // Push down tetrominos and set vars of tetrominos
                        tetrominos[z].isPlaced = false;
                        tetrominos[z].y1 = tetrominos[z].y1 + 40;
                        tetrominos[z].y2 = tetrominos[z].y2 + 40;
                        tetrominos[z].y3 = tetrominos[z].y3 + 40;
                        tetrominos[z].y4 = tetrominos[z].y4 + 40;
                        // Var reset for movement purposes
                        tetrominos[z].wasCleared = true;
                        tetrominos[z].isPlaced = true;
                        
                    }
                }
                // Add score for clearing a line. No multiplier yet for a double, triple, or tetris.
                // Also no score for advanced moves like t-spins (because they're really not possible
                // and they break the game)
                this.score += 1000;
            }
            // Set the boxes that were cleared to be not used (changes back later when a piece is placed 
            // anywhere)
            for (let j = 0; j < 10; j++) {
                gameMap[i + j].boxUsed = false;
            }
        }
        
    }

    // Grid of the game and set the properties of the map
    build() {
        for (let y = this.y; y < height; y += height / 20) {
            for (let x = this.x; x < 400; x += 400 / 10) {
                let boxUsed = false;
                let col = 255;
                gameMap.push({
                    x,
                    y,
                    boxUsed,
                    col
                });
                // Visualize the grid
                rect(x, y, 40, 40);
            }
        }
    }

    drawInterface() {
        // Draw the "next piece" text
        textFont("Russo One")
        textSize(30);
        text("NEXT", 420, 30);
        // Draw score text
        text("SCORE", 410, 350)
        text(this.score, 410, 380)
        // Draw the "next piece" box
        stroke(255);
        fill(0);
        rect(410, 35, 100, 100);
        // reset stroke for rest of game board
        stroke(0);
        // Draw the actual next piece
        // Custom positions because images are weird dimensions.
        if (nextImage == images.IPiece) {
            image(images.IPiece, 418, 73, images.IPiece.width / 4, images.IPiece.height / 4);
        } else if (nextImage == images.OPiece) {
            image(images.OPiece, 433, 57, images.OPiece.width / 3, images.OPiece.height / 3);
        } else if (nextImage == images.LPiece) {
            image(images.LPiece, 418, 55, images.LPiece.width / 3, images.LPiece.height / 3);
        } else if (nextImage == images.TPiece) {
            image(images.TPiece, 418, 55, images.TPiece.width / 3, images.TPiece.height / 3);
        } else if (nextImage == images.JPiece) {
            image(images.JPiece, 418, 55, images.JPiece.width / 3, images.JPiece.height / 3);
        } else if (nextImage == images.SPiece) {
            image(images.SPiece, 417, 56, images.SPiece.width / 3, images.SPiece.height / 3);
        } else if (nextImage == images.ZPiece) {
            image(images.ZPiece, 418, 57, images.ZPiece.width / 3, images.ZPiece.height / 3);
        }
    }

    // Push the nextPiece to our array of tetrominos and drop it.
    createPiece() {
        tetrominos.push(nextPiece);
        tetrominos[tetrominos.length - 1].isDropping = true;
    }
    
    // Store a random piece in the nextPiece var + set image in the NEXT box
    nextPiece() {
        let randNum = Math.random();
        if (randNum < 0.14285) {
            nextPiece = new IPiece;
            nextImage = images.IPiece;
        } else if (randNum < 0.2848) {
            nextPiece = new OPiece;
            nextImage = images.OPiece;
        } else if (randNum < 0.426) {
            nextPiece = new LPiece;
            nextImage = images.LPiece;
        } else if (randNum < 0.5688) {
            nextPiece = new TPiece;
            nextImage = images.TPiece;
        } else if (randNum < 0.7108) {
            nextPiece = new JPiece;
            nextImage = images.JPiece;
        } else if (randNum < 0.8528) {
            nextPiece = new SPiece;
            nextImage = images.SPiece;
        } else {
            nextPiece = new ZPiece;
            nextImage = images.ZPiece;
        }
    }
}