
const chia = require('chai').should();
const Minesweeper = require('../minesweeper.js');
const Square = require('../square.js');

describe('Square', function() {

  describe('#constructor', function() {
    it('should not be mined', function() {
      let square = new Square();
      square.isMined.should.equal(false);
    });
  });

});