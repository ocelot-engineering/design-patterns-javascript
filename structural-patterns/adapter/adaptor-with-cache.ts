import { scrypt, randomBytes, createHash } from 'crypto';

/* Point and drawPoint need to be adapted to, they cannot be changed internally. */
class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

const drawPoint = (point: Point): void => {
    process.stdout.write('.');
};

/* 
    We want a class that can draw rectangles from points , so we adapt to drawPoint
*/

class Line {
    public start: Point;
    public end: Point;
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    toString() {
        return `${this.start.toString()}->${this.end.toString()}`;
    }
}

class VectorObject extends Array {}

class VectorRectangle extends VectorObject {
    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.push(new Line(new Point(x, y), new Point(x + width, y)));
        this.push(
            new Line(new Point(x + width, y), new Point(x + width, y + height))
        );
        this.push(new Line(new Point(x, y), new Point(x, y + height)));
        this.push(
            new Line(new Point(x, y + height), new Point(x + width, y + height))
        );
        this.push;
    }
}

/*
    We need an adaptor for Lines to Points
*/

class LineToPointAdapter extends Array {
    private static cache: Record<string, Point[]> = {};
    private static count: number = 0;
    private hash: string;

    constructor(line: Line) {
        super();

        const hash = createHash('sha256').update(JSON.stringify(line));
        this.hash = hash.digest('hex');

        if (LineToPointAdapter.cache[this.hash]) {
            return;
        }

        console.log(
            `${LineToPointAdapter.count++}: Generating points for line ${line.toString()} (with caching)`
        );

        let points: Point[] = [];

        let left = Math.min(line.start.x, line.end.x);
        let right = Math.max(line.start.x, line.end.x);
        let top = Math.min(line.start.y, line.end.y);
        let bottom = Math.max(line.start.y, line.end.y);

        if (right - left === 0) {
            for (let y = top; y <= bottom; ++y) {
                points.push(new Point(left, y));
            }
        } else if (line.end.y - line.start.y === 0) {
            for (let x = left; x <= right; ++x) {
                points.push(new Point(x, top));
            }
        }

        LineToPointAdapter.cache[this.hash] = points;
    }

    get items(): Point[] {
        return LineToPointAdapter.cache[this.hash];
    }
}

/* Test */

const vectorObjects: VectorRectangle[] = [
    new VectorRectangle(1, 1, 10, 10),
    new VectorRectangle(3, 3, 6, 6),
];

const draw = function () {
    let adapter;
    for (let vo of vectorObjects) {
        for (let line of vo) {
            adapter = new LineToPointAdapter(line);
            adapter.items.forEach(drawPoint);
        }
    }
};

draw();
draw();
