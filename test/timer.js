const chia = require('chai').should();
const Timer = require('../timer.js');

describe('Timer', function () {

    describe('#duration', function () {

        it('duration of a new timer is 0', function () {
            const timer = new Timer();
            timer.duration().should.equal(0);
        });

        it('duration of started timer', function () {
            const timer = new Timer();
            timer.start();
            timer.duration().should.equal(0);
        });

    });
});