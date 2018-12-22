const Field = require('../field.js');
const Coordinate = require('../coordinate.js');
const chai = require('chai'), should = chai.should();

describe('Field', function () {

    /*
       minefield layout
       _________
       | # 2 _ |
       | # 2 _ |
       | 1 1 _ |
       –––––––––
    */

    let field;

    beforeEach(() => {
        field = new Field(3, 3, [new Coordinate(0, 0), new Coordinate(0, 1)]);
    });

    describe('#_neighborSquaresOf(coordinate)', function () {

        it('(0,0) neighbors are (0,1), (1,0) and (1,1)', function () {
            const neighborSquares = Array.from(field._neighborSquaresOf(new Coordinate(0, 0)));
            neighborSquares.length.should.equal(3);
            neighborSquares.should.contain(
                field._grid[0][1],
                field._grid[1][1],
                field._grid[1][0]);
        });

        it('in 10x10 field (2,2) neighbors are (1,1) (2,1) and (1,2)', function () {
            const neighborSquares = Array.from(field._neighborSquaresOf(new Coordinate(2, 2)));
            neighborSquares.length.should.equal(3);
            neighborSquares.should.contain(
                field._grid[1][1],
                field._grid[2][1],
                field._grid[1][2]);
        });

    });

    describe('#constructor', function () {
        it('mines laid to (0,0) and (0,1) and neighbors updated', function () {

            field.squareAt(new Coordinate(0, 0)).isMined.should.be.true;
            field.squareAt(new Coordinate(0, 1)).isMined.should.be.true;

            field.squareAt(new Coordinate(2, 0)).isEmpty.should.be.true;
            field.squareAt(new Coordinate(2, 1)).isEmpty.should.be.true;
            field.squareAt(new Coordinate(2, 2)).isEmpty.should.be.true;

            field.squareAt(new Coordinate(1, 0)).nearbyMines.should.equal(2);
            field.squareAt(new Coordinate(1, 1)).nearbyMines.should.equal(2);
            field.squareAt(new Coordinate(1, 2)).nearbyMines.should.equal(1);
            field.squareAt(new Coordinate(0, 2)).nearbyMines.should.equal(1);
        });
    });

    describe('#reveal', function () {

        it('revealing (1,0) should reveal just (1,0)', function () {

            const revealedCoordinates = field.revealSquareAt(new Coordinate(1, 0));
            revealedCoordinates.length.should.equal(1);
            revealedCoordinates[0].equals(new Coordinate(1, 0));
            field.isCleared.should.be.false;
        });

        it('revealing (2,0) should reveal (2,0), (2,1), (2,2), (1,0), (1,1), (1,2)', function () {

            const revealedCoordinates = field.revealSquareAt(new Coordinate(2, 0));
            revealedCoordinates.should.have.lengthOf(6);
            revealedCoordinates.should.have.deep.members([
                new Coordinate(2, 0),
                new Coordinate(2, 1),
                new Coordinate(2, 2),
                new Coordinate(1, 0),
                new Coordinate(1, 1),
                new Coordinate(1, 2)]);
            field.isCleared.should.be.false;
        });

        it('revealing (2,0) and (0,2) should clear minefield', function () {

            field.revealSquareAt(new Coordinate(2, 0));
            field.revealSquareAt(new Coordinate(0, 2));
            field.isCleared.should.be.true;

        });
    });
});