class Reactangle {
    public _width: number;
    public _height: number;
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }

    set width(value) {
        this._width = value;
    }
    set height(value) {
        this._height = value;
    }

    get area() {
        return this._width * this._height;
    }

    toString() {
        return `${this._width}x${this._height}`;
    }
}

class Square extends Reactangle {
    constructor(size: number) {
        super(size, size);
    }

    set width(value: number) {
        this._width = this._height = value;
    }
    set height(value: number) {
        this._height = this._width = value;
    }
}

let useIt = function (rc: Reactangle) {
    let width = rc._width;
    rc.height = 10;
    console.log(`Expected area of ${10 * width}, got ${rc.area}`);
};

let rc = new Reactangle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);

// Square doesn't work with useIt, it breaks functionality.
// The solution in this case is to not have Square be it's own class or at least,
// do not have it inherit from Rectangle.
