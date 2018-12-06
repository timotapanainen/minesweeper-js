const Cell = require('./cell.js');
const Coordinate = require('./coordinate.js');
const assert = require('assert');


class Field {

    constructor(width, height, mineCoordinates) {
        this._width = width;
        this._height = height;
        this._grid = this._createCellGrid(width, height);
        this._cellsRevealed = 0;
        this._minesLaid = this._layMines(this._grid, mineCoordinates);

    }

    _createCellGrid(width, height) {
        return Array(width).fill().map(() => Array(height).fill().map(() => new Cell()));
    }

    _layMines(grid, mineCoordinates) {
        let minesLaid = 0;
        for (let coordinate of mineCoordinates) {
            const cell = this.cellAt(coordinate);
            assert(!cell.isMined, `Coordinate ${coordinate} is already mined!`);
            cell.layMine();
            ++minesLaid;
            const neighbors = this._neighborCellsOf(coordinate);
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

    * _neighborCellsOf(coordinate) {
        for (let neighborCoordinate of this._neighborCoordinatesOf(coordinate)) {
            yield this.cellAt(neighborCoordinate);        
        }
    }

    get isCleared() {
        return this._cellsRevealed + this._minesLaid === this._width * this._height;
    }

    cellAt(coordinate) {
        return this._grid[coordinate.x][coordinate.y];
    }

    revealCellAt(coordinate) {
        const revealedCells = [];
        this._revealCellAt(coordinate, revealedCells);
        this._cellsRevealed += revealedCells.length;
        return revealedCells;
    }

    _revealCellAt(coordinate, revealedCoords) {
        const cell = this.cellAt(coordinate);
        if (!cell.isRevealed) {
            cell.reveal();
            revealedCoords.push(coordinate);
            if (cell.isEmpty) {
                for (let neighborCoord of this._neighborCoordinatesOf(coordinate)) {
                    this._revealCellAt(neighborCoord, revealedCoords);
                }
            }
        }
    }


    toString() {
        let stringified = '';
        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                let cell = this._grid[x][y];
                stringified += ' ' + cell.toString();
            }
            stringified += '\n';
        } 
        return stringified;
    }
}

module.exports = Field;
