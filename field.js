const Square = require('./square.js');
const Coordinate = require('./coordinate.js');
const assert = require('assert');


class Field {

    constructor(width, height, mineCoordinates) {
        this._width = width;
        this._height = height;
        this._grid = this._createGrid(width, height);
        this._squaresRevealed = 0;
        this._minesLaid = this._layMines(this._grid, mineCoordinates);
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get mines() {
        return this._minesLaid;
    }

    _createGrid(width, height) {
        return Array(width).fill().map(() => Array(height).fill().map(() => new Square()));
    }

    _layMines(grid, mineCoordinates) {
        let minesLaid = 0;
        for (let coordinate of mineCoordinates) {
            const square = this.squareAt(coordinate);
            assert(!square.isMined, `Square ${coordinate} is already mined!`);
            square.layMine();
            ++minesLaid;
            const neighbors = this._neighborSquaresOf(coordinate);
            for (let neighbor of neighbors) {
                if (!neighbor.isMined)
                    neighbor.nextToMine();
            }
        }
        return minesLaid;
    }

    * _neighborCoordinatesOf(coordinate) {
        for(let x = coordinate.x - 1; x <= coordinate.x + 1; ++x) {
            for (let y = coordinate.y - 1; y <= coordinate.y + 1; ++y) {
                if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
                    if (!(x === coordinate.x && y === coordinate.y)) {
                        yield new Coordinate(x, y);
                    }
                }
            }
        } 
    }

    * _neighborSquaresOf(coordinate) {
        for (let neighborCoordinate of this._neighborCoordinatesOf(coordinate)) {
            yield this.squareAt(neighborCoordinate);
        }
    }

    get isCleared() {
        return this._squaresRevealed + this._minesLaid === this._width * this._height;
    }

    squareAt(coordinate) {
        return this._grid[coordinate.x][coordinate.y];
    }

    revealSquareAt(coordinate) {
        const revealedSquares = [];
        this._revealSquareAt(coordinate, revealedSquares);
        this._squaresRevealed += revealedSquares.length;
        return revealedSquares;
    }

    _revealSquareAt(coordinate, revealedCoords) {
        const square = this.squareAt(coordinate);
        if (!square.isRevealed) {
            square.reveal();
            revealedCoords.push(coordinate);
            if (square.isEmpty) {
                for (let neighborCoord of this._neighborCoordinatesOf(coordinate)) {
                    this._revealSquareAt(neighborCoord, revealedCoords);
                }
            }
        }
    }

    toString() {
        let stringified = '';
        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                let square = this._grid[x][y];
                stringified += ' ' + square.toString();
            }
            stringified += '\n';
        } 
        return stringified;
    }
}

module.exports = Field;
