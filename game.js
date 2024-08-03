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
        for (let i = this.gameMap.length - 1; i >= 0; i--) {
            for (let z = this.tetrominos.length - 1; z >= 0; z--) {
                const tetromino = this.tetrominos[z];
                const mapSquare = this.gameMap[i];

                if (this.isIntersecting(tetromino, mapSquare)) {
                    if (this.shouldPlaceTetromino(tetromino, i)) {
                        this.placeTetromino(tetromino);
                    }

                    if (tetromino.isPlaced) {
                        mapSquare.boxUsed = true;

                        if (this.isGameOver(tetromino)) {
                            this.resetGame();
                            z = this.tetrominos.length;
                        }
                    }
                }
            }
        }
    }

    isIntersecting(tetromino, mapSquare) {
        return rectIntersect1(tetromino, mapSquare) ||
               rectIntersect2(tetromino, mapSquare) ||
               rectIntersect3(tetromino, mapSquare) ||
               rectIntersect4(tetromino, mapSquare);
    }

    shouldPlaceTetromino(tetromino, mapIndex) {
        return this.isBottomCollision(tetromino) || this.isLandedOnTetromino(tetromino, mapIndex);
    }

    isBottomCollision(tetromino) {
        return [tetromino.y1, tetromino.y2, tetromino.y3, tetromino.y4].some(y => y === height - 40) && !tetromino.isPlaced;
    }

    isLandedOnTetromino(tetromino, mapIndex) {
        const nextSquare = this.gameMap[mapIndex + 10];
        return !tetromino.isPlaced && nextSquare && nextSquare.boxUsed &&
               [tetromino.y1, tetromino.y2, tetromino.y3, tetromino.y4].some(y => y + 40 === nextSquare.y);
    }

    placeTetromino(tetromino) {
        tetromino.isPlaced = true;
        tetromino.isDropping = false;
        this.placePiece();
    }

    isGameOver(tetromino) {
        return tetromino.isPlaced && [tetromino.y1, tetromino.y2, tetromino.y3, tetromino.y4].some(y => y === 0);
    }

    resetGame() {
        this.tetrominos = [];
        this.gameMap = [];
        setup();
    }

    lineClear() {
        for (let i = 0; i < this.gameMap.length; i += 10) {
            if (this.isLineFull(i)) {
                this.clearLine(i);
                this.score += 1000;
            }
            this.resetLineUsage(i);
        }
    }

    isLineFull(lineStart) {
        return Array.from({length: 10}, (_, j) => this.gameMap[lineStart + j].boxUsed)
                    .every(used => used === true);
    }

    clearLine(lineY) {
        this.tetrominos.forEach(tetromino => {
            [tetromino.y1, tetromino.y2, tetromino.y3, tetromino.y4].forEach((y, index) => {
                if (y === this.gameMap[lineY].y) {
                    tetromino[`y${index + 1}`] = 5000;
                } else if (y < this.gameMap[lineY].y) {
                    tetromino[`y${index + 1}`] += 40;
                }
            });
        });
    }

    resetLineUsage(lineStart) {
        for (let j = 0; j < 10; j++) {
            this.gameMap[lineStart + j].boxUsed = false;
        }
    }
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
