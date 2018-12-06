const Coordinate = require('./coordinate.js');
const Field = require('./field.js');
const Timer = require('./timer.js');
const GameState = require('./enum.js');

class Minesweeper {

    constructor({width, height, mines, field}) {
        this._timer = new Timer();
        this._state = GameState.Ready;
        this._field = field ||
            new Field(width, height, Coordinate.generator(mines, width, height));
    }

    reveal(coordinate) {

        if (this.isGameOver())
            throw `Cannot reveal cell ${coordinate}! Game has ended.`;

        const cell = this._field.cellAt(coordinate);

        if (cell.isRevealed)
            throw `Cannot reveal cell ${coordinate}! Cell is already revealed.`

        if (this.isGameReady())
            this._startGame();
        
        const revealedCoords = this._field.revealCellAt(coordinate);

        if (cell.isMined)
            this._endGame(false);

        if (this._field.isCleared)
            this._endGame(true);
            
        return revealedCoords;
    }

    _startGame() {
        this._timer.start();
        this._state = GameState.Running;
    }

    _endGame(succeeded) {
        this._timer.end();
        this._state = succeeded ? GameState.Succeeded : GameState.Failed;
    }


    get state() {
        return this._state;
    }

    get duration() {
        return this._timer.duration(); 
    }

    isGameReady() {
        return this._state === GameState.Ready;
    }

    isGameOver() {
        return this._state === GameState.Succeeded || this.state === GameState.Failed;
    }  
    
    toString() {
        return this._field.toString();
    }
}

module.exports = Minesweeper;
