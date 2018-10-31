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
    }

    build() {
        for (let x = this.x; x < width; x += width / 10) {
            for (let y = this.y; y < height; y += height / 20) {
                gameMap.push({x, y});
            }
        }
    }
}