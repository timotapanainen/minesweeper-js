class Timer {

    constructor() {
        this._startTime = undefined;
        this._endTime = undefined;
    }

    start() {
        this._startTime = Date.now();
    }

    end() {
        this._endTime = Date.now();
    }

    duration() {
        return !(this._startTime) ? 0 :
            (this._endTime ? this._endTime : Date.now()) - this._startTime;
    }
}

module.exports = Timer;