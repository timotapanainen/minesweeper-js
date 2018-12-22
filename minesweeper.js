const Coordinate = require('./coordinate.js');
const Field = require('./field.js');
const Timer = require('./timer.js');
const GameState = require('./enum.js');

class Minesweeper {

    constructor({width, height, mines, field}) {
        this._timer = new Timer();
        this._state = GameState.Created;
        this._field = field ||
            new Field(width, height, Coordinate.generator(mines, width, height));
    }

    reveal(coordinate) {

        if (this.isOver())
            throw `Cannot reveal cell ${coordinate}! Game is over.`;

        const square = this._field.squareAt(coordinate);

        if (square.isRevealed)
            throw `Cannot reveal cell ${coordinate}! Cell is already revealed.`

        if (!this.isStarted())
            this._startGame();
        
        const revealedCoords = this._field.revealSquareAt(coordinate);

        if (square.isMined)
            this._endGame(false);

        if (this._field.isCleared)
            this._endGame(true);
            
        return revealedCoords;
    }

    _startGame() {
        this._timer.start();
        this._state = GameState.Running;
    }

    _endGame(cleared) {
        this._timer.end();
        this._state = cleared ? GameState.Cleared : GameState.Failed;
    }

    squareAt(coordinate) {
        return this._field.squareAt(coordinate);
    }

    get state() {
        return this._state;
    }

    get duration() {
        return this._timer.duration(); 
    }

    get width() {
        return this._field.width;
    }

    get height() {
        return this._field.height;
    }

    isStarted() {
        return !(this._state === GameState.Created);
    }

    isOver() {
        return this._state === GameState.Cleared || this.state === GameState.Failed;
    }  
    
    toString() {
        return this._field.toString();
    }
}

module.exports = Minesweeper;
