"use strict";
let tetrominos = [];
let gameMap = [];
let nextPiece;
let nextImage;
let images = {};

class Boxes {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 40;
        this.h = 40;
        this.boxUsed = false;
        this.stop = false;
    }

    boxDetection() {
        for (let i = gameMap.length - 1; i >= 0; i--) {
            for (let z = tetrominos.length - 1; z >= 0; z--) {
                if (rectIntersect1(tetrominos[z], gameMap[i]) || rectIntersect2(tetrominos[z], gameMap[i]) ||
                    rectIntersect3(tetrominos[z], gameMap[i]) || rectIntersect4(tetrominos[z], gameMap[i])) {
                    if (tetrominos[z].y1 == height - 40 && tetrominos[z].isPlaced == false ||
                        tetrominos[z].y2 == height - 40 && tetrominos[z].isPlaced == false ||
                        tetrominos[z].y3 == height - 40 && tetrominos[z].isPlaced == false ||
                        tetrominos[z].y4 == height - 40 && tetrominos[z].isPlaced == false) {
                        tetrominos[z].isPlaced = true;
                        tetrominos[z].isDropping = false;
                        this.createPiece();
                        this.nextPiece();
                    } else if (tetrominos[z].isPlaced == false && tetrominos[z].y1 + 40 == gameMap[i + 10].y && 
                        gameMap[i + 10].boxUsed == true ||
                        tetrominos[z].isPlaced == false && tetrominos[z].y2 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true || tetrominos[z].isPlaced == false &&
                        tetrominos[z].y3 + 40 == gameMap[i + 10].y && gameMap[i + 10].boxUsed == true ||
                        tetrominos[z].isPlaced == false && tetrominos[z].y4 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true) {
                        tetrominos[z].isPlaced = true;
                        tetrominos[z].isDropping = false;
                        this.createPiece();
                        this.nextPiece();
                    }
                    if (tetrominos[z].isPlaced == true) {
                        gameMap[i].boxUsed = true;
                    }
                    if (tetrominos[z].isPlaced == true && tetrominos[z].y1 == 0 ||
                        tetrominos[z].isPlaced == true && tetrominos[z].y2 == 0 ||
                        tetrominos[z].isPlaced == true && tetrominos[z].y3 == 0 ||
                        tetrominos[z].isPlaced == true && tetrominos[z].y4 == 0) {
                        tetrominos = [];
                        gameMap = [];
                        setup();
                        z = tetrominos.length;
                    }
                }
            }
        }
    }

    lineClear() {
        for (let i = 0; i < gameMap.length; i += 10) {
            if (gameMap[i].boxUsed == true && gameMap[i + 1].boxUsed == true && gameMap[i + 2].boxUsed == true &&
                gameMap[i + 3].boxUsed == true && gameMap[i + 4].boxUsed == true &&
                gameMap[i + 5].boxUsed == true && gameMap[i + 6].boxUsed == true &&
                gameMap[i + 7].boxUsed == true && gameMap[i + 8].boxUsed == true &&
                gameMap[i + 9].boxUsed == true) {
                // for (let j = 0; j < 10; j++) {
                //     gameMap[i + j].boxUsed = false;
                // }
                // gameMap[i].col = 255;
                // fill(gameMap[i].col);
                for (let z = 0; z < tetrominos.length; z++) {
                    // tetrominos.splice(z, 1);
                    if (tetrominos[z].y1 < gameMap[i].y || tetrominos[z].y2 < gameMap[i].y ||
                        tetrominos[z].y3 < gameMap[i].y || tetrominos[z].y4, gameMap[i].y) {
                        tetrominos[z].isPlaced = false;
                        tetrominos[z].y1 = tetrominos[z].y1 + 40;
                        tetrominos[z].y2 = tetrominos[z].y2 + 40;
                        tetrominos[z].y3 = tetrominos[z].y3 + 40;
                        tetrominos[z].y4 = tetrominos[z].y4 + 40;
                        tetrominos[z].wasCleared = true;
                        tetrominos[z].isPlaced = true;
                        // tetrominos[z].isDropping = false;
                    }
                    // if (rectIntersect1(tetrominos[z], gameMap[i + j]) || rectIntersect2(tetrominos[z], gameMap[i + j]) ||
                    //     rectIntersect3(tetrominos[z], gameMap[i + j]) || rectIntersect4(tetrominos[z], gameMap[i + j])) {
                    //     tetrominos[z].y1 = tetrominos[z].y1 + 40;
                    //     tetrominos[z].y2 = tetrominos[z].y2 + 40;
                    //     tetrominos[z].y3 = tetrominos[z].y3 + 40;
                    //     tetrominos[z].y4 = tetrominos[z].y4 + 40;
                    //     tetrominos[z].isPlaced = false;
                    // }
                    //
                }
            }
            for (let j = 0; j < 10; j++) {
                gameMap[i + j].boxUsed = false;
            }
        }
        // this.createPiece();
        // console.log(i);
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
                rect(x, y, 40, 40);
            }
        }
    }

    drawInterface() {
        // Draw the "next piece" text
        textFont("Russo One")
        textSize(30);
        text("NEXT", 420, 30);
        // Draw the "next piece" box
        stroke(255);
        fill(0);
        rect(410, 35, 100, 100);
        // reset stroke for rest of game board
        stroke(0);
        // Draw the actual next piece
        if (nextImage == images.IPiece) {
            image(images.IPiece, 418, 73, images.IPiece.width / 4, images.IPiece.height / 4);
        } else if (nextImage == images.OPiece) {
            image(images.OPiece, 433, 57, images.OPiece.width / 3, images.OPiece.height / 3);
        } else if (nextImage ==images.LPiece) {
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

    // Draw a random piece
    createPiece() {
            tetrominos.push(nextPiece);
            tetrominos[tetrominos.length - 1].isDropping = true;
    }

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