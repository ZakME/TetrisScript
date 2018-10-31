"use strict";

// Init I Tetromino
class IPiece {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 40;
        this.y2 = 0;
        this.x3 = 80;
        this.y3 = 0;
        this.x4 = 120;
        this.y4 = 0;
        this.col = "#00F3FF";
        this.rotVal = 1;
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    // Long block of if statements and manually adding values because i dont know the formula
    rotate() {
        if (keyCode == 32 && this.rotVal == 1) {
            this.x2 = this.x2 - 40;
            this.y2 = this.y2 + 40;
            this.x3 = this.x3 - 80;
            this.y3 = this.y3 + 80;
            this.x4 = this.x4 - 120;
            this.y4 = this.y4 + 120;
        }

        if (keyCode == 32 && this.rotVal == 2) {
            this.x2 = this.x2 + 40;
            this.y2 = this.y2 - 40;
            this.x3 = this.x3 + 80;
            this.y3 = this.y3 - 80;
            this.x4 = this.x4 + 120;
            this.y4 = this.y4 - 120;
        }

        if (keyCode == 32) {
            this.rotVal++;
            if (this.rotVal > 2) {
                this.rotVal = 1;
            }
        }

    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}

// Init O Tetromino
class OPiece {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 40;
        this.y2 = 0;
        this.x3 = 0;
        this.y3 = 40;
        this.x4 = 40;
        this.y4 = 40;
        this.col = "#FFF300";
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}

// Init T Tetromino
class TPiece {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 40;
        this.y2 = 0;
        this.x3 = 80;
        this.y3 = 0;
        this.x4 = 40;
        this.y4 = 40;
        this.col = "#B900FF";
        this.rotVal = 1;
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    // Long block of if statements and manually adding values because i dont know the formula
    rotate() {
        if (keyCode == 32 && this.rotVal == 1) {
            this.y1 = this.y1 + 80;
            this.x2 = this.x2 - 40;
            this.y2 = this.y2 + 40;
            this.x3 = this.x3 - 80;
        }

        if (keyCode == 32 && this.rotVal == 2) {
            this.x1 = this.x1 + 80;   
            this.y1 = this.y1 - 40;
            this.x2 = this.x2 + 40;
            this.y3 = this.y3 + 40;
            this.y4 = this.y4 - 40;
        }

        if (keyCode == 32 && this.rotVal == 3) {
            this.x1 = this.x1 - 40;
            this.y1 = this.y1 - 40;
            this.x3 = this.x3 + 40;
            this.y3 = this.y3 + 40;
            this.x4 = this.x4 - 40;
            this.y4 = this.y4 + 40;
        }

        if (keyCode == 32 && this.rotVal == 4) {
            this.x1 = this.x1 - 40;
            this.y2 = this.y2 - 40;
            this.y3 = this.y3 - 80;
            this.x3 = this.x3 + 40;
            this.x4 = this.x4 + 40;
        }

        if (keyCode == 32) {
            this.rotVal++;
            if (this.rotVal > 4) {
                this.rotVal = 1;
            }
        }

    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}

// Init S Tetromino
class SPiece {
    constructor() {
        this.x1 = 80;
        this.y1 = 0;
        this.x2 = 40;
        this.y2 = 0;
        this.x3 = 40;
        this.y3 = 40;
        this.x4 = 0;
        this.y4 = 40;
        this.col = "#FF0000";
        this.rotVal = 1;
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    // Long block of if statements and manually adding values because i dont know the formula
    rotate() {
        if (keyCode == 32 && this.rotVal == 1) {
            this.x1 = this.x1 - 40;
            this.y1 = this.y1 + 80;
            this.y2 = this.y2 + 40;
            this.x3 = this.x3 - 40;
            this.y4 = this.y4 - 40;
        }

        if (keyCode == 32 && this.rotVal == 2) {
            this.x1 = this.x1 + 40;
            this.y1 = this.y1 - 80;
            this.y2 = this.y2 - 40;
            this.x3 = this.x3 + 40;
            this.y4 = this.y4 + 40;
        }

        if (keyCode == 32) {
            this.rotVal++;
            if (this.rotVal > 2) {
                this.rotVal = 1;
            }
        }

    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}

// Init Z Tetromino
class ZPiece {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 40;
        this.y2 = 0;
        this.x3 = 40;
        this.y3 = 40;
        this.x4 = 80;
        this.y4 = 40;
        this.col = "#26D104";
        this.rotVal = 1;
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    // Long block of if statements and manually adding values because i dont know the formula
    rotate() {
        if (keyCode == 32 && this.rotVal == 1) {
            this.x1 = this.x1 + 40
            this.y2 = this.y2 + 40;
            this.x3 = this.x3 - 40;
            this.x4 = this.x4 - 80;
            this.y4 = this.y4 + 40;
        }

        if (keyCode == 32 && this.rotVal == 2) {
            this.x1 = this.x1 - 40
            this.y2 = this.y2 - 40;
            this.x3 = this.x3 + 40;
            this.x4 = this.x4 + 80;
            this.y4 = this.y4 - 40;
        }

        if (keyCode == 32) {
            this.rotVal++;
            if (this.rotVal > 2) {
                this.rotVal = 1;
            }
        }

    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}

// Init J Tetromino
class JPiece {
    constructor() {
        this.x1 = 40;
        this.y1 = 0;
        this.x2 = 40;
        this.y2 = 40;
        this.x3 = 40;
        this.y3 = 80;
        this.x4 = 0;
        this.y4 = 80;
        this.col = "#FF00DC";
        this.rotVal = 1;
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    // Long block of if statements and manually adding values because i dont know the formula
    rotate() {
        if (keyCode == 32 && this.rotVal == 1) {
            this.x1 = this.x1 - 40
            this.y2 = this.y2 - 40;
            this.y3 = this.y3 - 80;
            this.x3 = this.x3 + 40;
            this.x4 = this.x4 + 80;
            this.y4 = this.y4 - 40;
        }

        if (keyCode == 32 && this.rotVal == 2) {
            this.y1 = this.y1 + 80;
            this.x2 = this.x2 - 40;
            this.y2 = this.y2 + 40;
            this.x3 = this.x3 - 80;
            this.x4 = this.x4 - 40;
            this.y4 = this.y4 - 40;
        }

        if (keyCode == 32 && this.rotVal == 3) {
            this.x1 = this.x1 + 80;
            this.y1 = this.y1 - 40;
            this.x2 = this.x2 + 40;
            this.y3 = this.y3 + 40;
            this.x4 = this.x4 - 40;
        }

        if (keyCode == 32 && this.rotVal == 4) {
            this.x1 = this.x1 - 40;
            this.y1 = this.y1 - 40;
            this.x3 = this.x3 + 40;
            this.y3 = this.y3 + 40;
            this.y4 = this.y4 + 80;
        }

        if (keyCode == 32) {
            this.rotVal++;
            if (this.rotVal > 4) {
                this.rotVal = 1;
            }
        }

    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}

// Init L Tetromino
class LPiece {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 40;
        this.x3 = 0;
        this.y3 = 80;
        this.x4 = 40;
        this.y4 = 80;
        this.col = "#FF8B00";
        this.rotVal = 1;
    }

    show() {
        fill(this.col);
        rect(this.x1, this.y1, 40, 40);
        rect(this.x2, this.y2, 40, 40);
        rect(this.x3, this.y3, 40, 40);
        rect(this.x4, this.y4, 40, 40);
    }

    // Long block of if statements and manually adding values because i dont know the formula
    rotate() {
        if (keyCode == 32 && this.rotVal == 1) {
            this.y1 = this.y1 + 40;
            this.x2 = this.x2 + 40;
            this.x3 = this.x3 + 80;
            this.y3 = this.y3 - 40;
            this.x4 = this.x4 + 40;
            this.y4 = this.y4 - 80;
        }

        if (keyCode == 32 && this.rotVal == 2) {
            this.x1 = this.x1 + 40;
            this.y1 = this.y1 + 40;
            this.x3 = this.x3 - 40;
            this.y3 = this.y3 - 40;
            this.x4 = this.x4 - 80;
        }

        if (keyCode == 32 && this.rotVal == 3) {
            this.x1 = this.x1 + 40;
            this.y1 = this.y1 - 80;
            this.y2 = this.y2 - 40;
            this.x3 = this.x3 - 40;
            this.y4 = this.y4 + 40;
        }

        if (keyCode == 32 && this.rotVal == 4) {
            this.x1 = this.x1 - 80;
            this.x2 = this.x2 - 40;
            this.y2 = this.y2 + 40;
            this.y3 = this.y3 + 80;
            this.x4 = this.x4 + 40;
            this.y4 = this.y4 + 40;
        }

        if (keyCode == 32) {
            this.rotVal++;
            if (this.rotVal > 4) {
                this.rotVal = 1;
            }
        }

    }

    move() {
        setTimeout(this.moveLogic(), 500);
    }

    moveLogic() {
        this.y1 = this.y1 + 40;
        this.y2 = this.y2 + 40;
        this.y3 = this.y3 + 40;
        this.y4 = this.y4 + 40;
    }
}
