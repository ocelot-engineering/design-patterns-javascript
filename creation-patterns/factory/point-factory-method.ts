/*
    Factory method
*/

enum CoordinateSystem {
    cartesian = 'cartesian',
    polar = 'polar',
}

class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static newCartesianPoint(x: number, y: number) {
        return new Point(x, y);
    }

    static newPolarPoint(rho: number, theta: number) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

let p1 = Point.newCartesianPoint(2, 3);
console.log(p1);

let p2 = Point.newPolarPoint(5, Math.PI / 2);
console.log(p2);
