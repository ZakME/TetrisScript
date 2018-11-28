"use strict";
let tetrominos = [];
let gameMap = [];

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
                        this.createPiece();
                    } else if (tetrominos[z].isPlaced == false && tetrominos[z].y1 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true ||
                        tetrominos[z].isPlaced == false && tetrominos[z].y2 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true || tetrominos[z].isPlaced == false &&
                        tetrominos[z].y3 + 40 == gameMap[i + 10].y && gameMap[i + 10].boxUsed == true ||
                        tetrominos[z].isPlaced == false && tetrominos[z].y4 + 40 == gameMap[i + 10].y &&
                        gameMap[i + 10].boxUsed == true) {
                        tetrominos[z].isPlaced = true;
                        this.createPiece();
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
                gameMap[i].col = 255;
                fill(gameMap[i].col);
                for (let j = 0; j < 10; j++) {
                    for (let z = 0; z < tetrominos.length; z++) {
                        if (tetrominos[z].y1 < gameMap[i + j].y || tetrominos[z].y2 < gameMap[i + j].y ||
                            tetrominos[z].y3 < gameMap[i + j].y || tetrominos[z].y4, gameMap[i + j].y) {
                            tetrominos[z].y1 = tetrominos[z].y1 + 40;
                            tetrominos[z].y2 = tetrominos[z].y2 + 40;
                            tetrominos[z].y3 = tetrominos[z].y3 + 40;
                            tetrominos[z].y4 = tetrominos[z].y4 + 40;
                        }
                        if (rectIntersect1(tetrominos[z], gameMap[i + j]) || rectIntersect2(tetrominos[z], gameMap[i + j]) ||
                            rectIntersect3(tetrominos[z], gameMap[i + j]) || rectIntersect4(tetrominos[z], gameMap[i + j])) {
                            tetrominos[z].y1 = tetrominos[z].y1 + 40;
                            tetrominos[z].y2 = tetrominos[z].y2 + 40;
                            tetrominos[z].y3 = tetrominos[z].y3 + 40;
                            tetrominos[z].y4 = tetrominos[z].y4 + 40;
                        }
                    }
                }
            }
        }
    }

    build() {
        for (let y = this.y; y < height; y += height / 20) {
            for (let x = this.x; x < width; x += width / 10) {
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

    createPiece() {
        let randNum = Math.random();
        if (randNum < 0.14285) {
            tetrominos.push(new IPiece);
        } else if (randNum < 0.2848) {
            tetrominos.push(new OPiece);
        } else if (randNum < 0.426) {
            tetrominos.push(new LPiece);
        } else if (randNum < 0.5688) {
            tetrominos.push(new TPiece);
        } else if (randNum < 0.7108) {
            tetrominos.push(new JPiece);
        } else if (randNum < 0.8528) {
            tetrominos.push(new SPiece);
        } else {
            tetrominos.push(new ZPiece);
        }
    }
}