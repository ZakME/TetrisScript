"use strict";
let tetrominos = [];
let gameMap = [];

class Game {
    constructor() {

    }
}

class Boxes {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 40;
        this.h = 40;
        this.boxUsed = false;
    }

    boxDetection() {
        for (let i = 0; i < gameMap.length; i++) {
            for (let z = 0; z < tetrominos.length; z++) {
                if (rectIntersect1(tetrominos[z], gameMap[i]) || rectIntersect2(tetrominos[z], gameMap[i]) || rectIntersect3(tetrominos[z], gameMap[i]) || rectIntersect4(tetrominos[z], gameMap[i])) {
                    if (tetrominos[z].y1 == 0 && tetrominos[z].isPlaced == true || tetrominos[z].y2 == 0 && tetrominos[z].isPlaced == true || tetrominos[z].y3 == 0 && tetrominos[z].isPlaced == true || tetrominos[z].y4 == 0 && tetrominos[z].isPlaced == true) {
                        setup();
                    }
                    if (tetrominos[z].y1 == height - 40 && tetrominos[z].isPlaced == false || tetrominos[z].y2 == height - 40 && tetrominos[z].isPlaced == false || tetrominos[z].y3 == height - 40 && tetrominos[z].isPlaced == false || tetrominos[z].y4 == height - 40 && tetrominos[z].isPlaced == false) {
                        tetrominos[z].isPlaced = true;
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

                    if (tetrominos[z].y1 == gameMap[i].y && gameMap[i].boxUsed == true && tetrominos[z].isPlaced == false || tetrominos[z].y2 == gameMap[i].y && gameMap[i].boxUsed == true && tetrominos[z].isPlaced == false  || tetrominos[z].y3 == gameMap[i].y && gameMap[i].boxUsed == true && tetrominos[z].isPlaced == false || tetrominos[z].y4 == gameMap[i].y && gameMap[i].boxUsed == true && tetrominos[z].isPlaced == false) {
                        tetrominos[z].isPlaced = true;
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
                    if (tetrominos[z].isPlaced == true) {  
                        gameMap[i].boxUsed = true;
                    }
                }
            }
        }
    }

    build() {
        for (let x = this.x; x < width; x += width / 10) {
            for (let y = this.y; y < height; y += height / 20) {
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
}