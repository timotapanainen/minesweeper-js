
const chia = require('chai').should();
const Minesweeper = require('../minesweeper.js');
const Cell = require('../cell.js');

describe('Cell', function() {
  describe('#construct cell', function() {
    it('should not be mined', function() {
      let cell = new Cell();
      cell.isMined.should.equal(false);
    });
  });
});