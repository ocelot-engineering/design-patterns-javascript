class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    deepCopy() {
        const start = new Point(this.start.x, this.start.y);
        const end = new Point(this.end.x, this.end.y);
        return new Line(start, end);
    }
}

const line = new Line(new Point(1.4, 2.2), new Point(-1.7, 3.1));
const lineCopy = line.deepCopy();
console.log(line);
console.log(lineCopy);
