const should = require('chai').should();
const Minesweeper = require('../minesweeper.js');
const Coordinate = require('../coordinate.js');
const Field = require('../field.js');
const GameState = require('../enum.js');


describe('Minesweeper', function () {
    let minesweeper;

    describe('#constructor()', function () {
        it('new minefield should be in ready state and duration is 0', function () {
            const minesweeper = new Minesweeper({width: 10, height: 10, mines: 10});
            minesweeper.state.should.equal(GameState.Ready);
            minesweeper.duration.should.equal(0);
        });
    });

    describe('#reveal()', function() {
        it('first reveal should change status to Running', function() {
            const field = new Field(3, 3, [new Coordinate(0,0), new Coordinate(0,1), new Coordinate(0, 2)]);
            const minesweeper = new Minesweeper({field: field});
            minesweeper.reveal(new Coordinate(1, 0));
            minesweeper.state.should.equal(GameState.Running)
        });

        it('revealing all should end game successfully', function() {
            const field = new Field(3, 3, [new Coordinate(0,0), new Coordinate(0,1), new Coordinate(0, 2)]);
            const minesweeper = new Minesweeper({field: field});
            minesweeper.reveal(new Coordinate(2, 0));
            minesweeper.state.should.equal(GameState.Succeeded);
        });

        it('revealing mined cell should end game', function() {
            const field = new Field(3, 3, [new Coordinate(0,0), new Coordinate(0,1), new Coordinate(0, 2)]);
            const minesweeper = new Minesweeper({field: field});
            minesweeper.reveal(new Coordinate(0, 0));
            minesweeper.state.should.equal(GameState.Failed);
        });
    });
});