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
                    gameMap[i].col = "#FF0000";
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