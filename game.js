"use strict";

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
        this.gameState = "start";
        // Reimplement
        this.tetrominos = [];
        this.gameMap = [];
        this.nextPiece;
        this.nextImage;
        this.images = {};
    }

    // Runs code for placing a piece, cleans up code
    placePiece() {
        this.createPiece();
        this.nextPieceF();
        // Add score for placing. 36 because why not
        this.score += 36;
    }

    // All the collision detection for the this.tetrominos.
    boxDetection() {
        // For loop, loops through all spaces on the game board
        for (let i = this.gameMap.length - 1; i >= 0; i--) {
            // For loop, loops through all this.tetrominos for collision detection on a piece of the game board
            for (let z = this.tetrominos.length - 1; z >= 0; z--) {
                // Check for an intersection between a piece and a board square
                if (rectIntersect1(this.tetrominos[z], this.gameMap[i]) || rectIntersect2(this.tetrominos[z], this.gameMap[i]) ||
                    rectIntersect3(this.tetrominos[z], this.gameMap[i]) || rectIntersect4(this.tetrominos[z], this.gameMap[i])) {
                    // First case, tetromino hits bottom of board, Check coords and if the tetromino
                    // is dropping or placed
                    if (this.tetrominos[z].y1 == height - 40 && this.tetrominos[z].isPlaced == false ||
                        this.tetrominos[z].y2 == height - 40 && this.tetrominos[z].isPlaced == false ||
                        this.tetrominos[z].y3 == height - 40 && this.tetrominos[z].isPlaced == false ||
                        this.tetrominos[z].y4 == height - 40 && this.tetrominos[z].isPlaced == false) {
                        // Place the dropping tetromino, create a new one
                        this.tetrominos[z].isPlaced = true;
                        this.tetrominos[z].isDropping = false;
                        this.placePiece();
                        // Second case, tetromino lands on another tetromino, check if theres is a tetromino
                        // present underneath the dropping tetromino by checking 10 spaces ahead of dropping
                        // this.tetrominos coords
                    } else if (this.tetrominos[z].isPlaced == false && this.tetrominos[z].y1 + 40 == this.gameMap[i + 10].y &&
                        this.gameMap[i + 10].boxUsed == true ||
                        this.tetrominos[z].isPlaced == false && this.tetrominos[z].y2 + 40 == this.gameMap[i + 10].y &&
                        this.gameMap[i + 10].boxUsed == true || this.tetrominos[z].isPlaced == false &&
                        this.tetrominos[z].y3 + 40 == this.gameMap[i + 10].y && this.gameMap[i + 10].boxUsed == true ||
                        this.tetrominos[z].isPlaced == false && this.tetrominos[z].y4 + 40 == this.gameMap[i + 10].y &&
                        this.gameMap[i + 10].boxUsed == true) {
                        // Place the dropping tetromino, create a new one
                        this.tetrominos[z].isPlaced = true;
                        this.tetrominos[z].isDropping = false;
                        this.placePiece();
                    }
                    // After placing the tetromino with either case, set the squares the tetromino is
                    // placed on to used
                    if (this.tetrominos[z].isPlaced == true) {
                        this.gameMap[i].boxUsed = true;
                    }
                    // Check if a piece lands and is above the game board and reset game
                    if (this.tetrominos[z].isPlaced == true && this.tetrominos[z].y1 == 0 ||
                        this.tetrominos[z].isPlaced == true && this.tetrominos[z].y2 == 0 ||
                        this.tetrominos[z].isPlaced == true && this.tetrominos[z].y3 == 0 ||
                        this.tetrominos[z].isPlaced == true && this.tetrominos[z].y4 == 0) {
                        // Reset the game.
                        this.tetrominos = [];
                        this.gameMap = [];
                        setup();
                        // Reset z variable instead of changing loops because lazy
                        z = this.tetrominos.length;
                    }
                }
            }
        }
    }

    lineClear() {
        // Iterate through each line of the game map
        for (let i = 0; i < this.gameMap.length; i += 10) {
            // Check to see if a line is completely filled with this.tetrominos
            if (this.gameMap[i].boxUsed == true && this.gameMap[i + 1].boxUsed == true && this.gameMap[i + 2].boxUsed == true &&
                this.gameMap[i + 3].boxUsed == true && this.gameMap[i + 4].boxUsed == true &&
                this.gameMap[i + 5].boxUsed == true && this.gameMap[i + 6].boxUsed == true &&
                this.gameMap[i + 7].boxUsed == true && this.gameMap[i + 8].boxUsed == true &&
                this.gameMap[i + 9].boxUsed == true) {
                // Push the line off screen
                // Only even number lines clear too many (2 lines clears 3, 4 clears some amount i havent counted, 1 &
                // 3 clear normally)
                for (let z = 0; z < this.tetrominos.length; z++) {

                    if (this.tetrominos[z].y1 == this.gameMap[i].y) {
                        this.tetrominos[z].y1 = 5000;
                    } else if (this.tetrominos[z].y1 < this.gameMap[i].y) {
                        this.tetrominos[z].y1 += 40;
                    }


                    if (this.tetrominos[z].y2 == this.gameMap[i].y) {
                        this.tetrominos[z].y2 = 5000;
                    } else if (this.tetrominos[z].y2 < this.gameMap[i].y) {
                        this.tetrominos[z].y2 += 40;
                    }


                    if (this.tetrominos[z].y3 == this.gameMap[i].y) {
                        this.tetrominos[z].y3 = 5000;
                    } else if (this.tetrominos[z].y3 < this.gameMap[i].y) {
                        this.tetrominos[z].y3 += 40;
                    }


                    if (this.tetrominos[z].y4 == this.gameMap[i].y) {
                        this.tetrominos[z].y4 = 5000;
                    } else if (this.tetrominos[z].y4 < this.gameMap[i].y) {
                        this.tetrominos[z].y4 += 40;
                    }

                }

                this.score += 1000;

            }
            for (let j = 0; j < 10; j++) {
                this.gameMap[i + j].boxUsed = false;
            }
        }
    }
    // Set the boxes that were cleared to be not used (changes back later when a piece is placed 
    // anywhere)

    // Grid of the game and set the properties of the map
    build() {
        for (let y = this.y; y < height; y += height / 20) {
            for (let x = this.x; x < 400; x += 400 / 10) {
                let boxUsed = false;
                let col = 255;
                this.gameMap.push({
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

    // Optimization - If all the pieces of a tetromino are off the game board, splice out the tetromino
    optimizeTetromino() {
        for (let p = this.tetrominos.length - 1; p >= 0; p--) {
            if (this.tetrominos[p].y1 > 2000 && this.tetrominos[p].y2 > 2000 &&
                this.tetrominos[p].y3 > 2000 && this.tetrominos[p].y4 > 2000) {
                this.tetrominos.splice(p, 1);
            }
        }
    }


    drawInterface() {
        textAlign(LEFT);
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
        if (this.nextImage == this.images.IPiece) {
            image(this.images.IPiece, 418, 73, this.images.IPiece.width / 4, this.images.IPiece.height / 4);
        } else if (this.nextImage == this.images.OPiece) {
            image(this.images.OPiece, 433, 57, this.images.OPiece.width / 3, this.images.OPiece.height / 3);
        } else if (this.nextImage == this.images.LPiece) {
            image(this.images.LPiece, 418, 55, this.images.LPiece.width / 3, this.images.LPiece.height / 3);
        } else if (this.nextImage == this.images.TPiece) {
            image(this.images.TPiece, 418, 55, this.images.TPiece.width / 3, this.images.TPiece.height / 3);
        } else if (this.nextImage == this.images.JPiece) {
            image(this.images.JPiece, 418, 55, this.images.JPiece.width / 3, this.images.JPiece.height / 3);
        } else if (this.nextImage == this.images.SPiece) {
            image(this.images.SPiece, 417, 56, this.images.SPiece.width / 3, this.images.SPiece.height / 3);
        } else if (this.nextImage == this.images.ZPiece) {
            image(this.images.ZPiece, 418, 57, this.images.ZPiece.width / 3, this.images.ZPiece.height / 3);
        }
    }

    // Start screen
    drawStartScreen() {
        textFont("Russo One")
        fill(255);
        textAlign(CENTER);
        textSize(80);
        text("TetrisScript", width / 2, 200);
        textSize(40);
        text("Click to start!", width / 2, 500);
    }

    // End screen
    drawGameOver() {
        console.log("placeholder")
    }

    // Push the nextPiece to our array of this.tetrominos and drop it.
    createPiece() {
        this.tetrominos.push(this.nextPiece); // Use this for gameplay
        // this.tetrominos.push(new IPiece); // Use this to test line stuff
        this.tetrominos[this.tetrominos.length - 1].isDropping = true;
    }

    // Store a random piece in the nextPiece var + set image in the NEXT box
    nextPieceF() {
        let randNum = Math.random();
        if (randNum < 0.14285) {
            this.nextPiece = new IPiece;
            this.nextImage = this.images.IPiece;
        } else if (randNum < 0.2848) {
            this.nextPiece = new OPiece;
            this.nextImage = this.images.OPiece;
        } else if (randNum < 0.426) {
            this.nextPiece = new LPiece;
            this.nextImage = this.images.LPiece;
        } else if (randNum < 0.5688) {
            this.nextPiece = new TPiece;
            this.nextImage = this.images.TPiece;
        } else if (randNum < 0.7108) {
            this.nextPiece = new JPiece;
            this.nextImage = this.images.JPiece;
        } else if (randNum < 0.8528) {
            this.nextPiece = new SPiece;
            this.nextImage = this.images.SPiece;
        } else {
            this.nextPiece = new ZPiece;
            this.nextImage = this.images.ZPiece;
        }
    }
}