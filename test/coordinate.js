const Coordinate = require('../coordinate.js');
const should = require('chai').should();

describe('Coordinate', function() {
  let coordinate_1_2;

  beforeEach(() => {
    coordinate_1_2 = new Coordinate(1,2);
  });
  
  describe('#get()', function() {
    it('returns x and y', function() {
      coordinate_1_2.x.should.equal(1);
      coordinate_1_2.y.should.equal(2);
    });
  });

});