class Coordinate {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    equals(other) {
        return this.x == other.x && this.y === other.y;
    }

    static * generator(count, max_x, max_y) {
        const generated = new Set();

        do {
            const candidate = Coordinate._randomCoordinate(max_x, max_y);
            const key = candidate.toString();
            if (!generated.has(key)) {
                generated.add(key);
                yield candidate;
            }
        } while (generated.size < count)
    }

    static _randomCoordinate(max_x, max_y) {
        return new Coordinate(
            Coordinate._randomInt(max_x),
            Coordinate._randomInt(max_y));
    }

    static _randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    toString() {
        return `(${this._x},${this._y})`
    }
}

module.exports = Coordinate;