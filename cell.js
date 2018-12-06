
module.exports = class Cell {
    
    constructor() {
        this._revealed = false;
        this._mined = false;
        this._nearbyMines = 0;
    }

    get isRevealed() {
        return this._revealed;
    }
    
    get isMined() {
        return this._mined;
    }

    get nearbyMines() {
        return this._nearbyMines;
    }

    get isEmpty() {
        return this._nearbyMines == 0 && !this._mined;
    }

    reveal() {
        this._revealed = true;
    }

    layMine() {
        this._mined = true;
    }

    nextToMine() {
        this._nearbyMines += 1;
    }

    toString() {
        return this._revealed ? (this._mined ? 'x' : '' + this._nearbyMines) : '#';
    }
};