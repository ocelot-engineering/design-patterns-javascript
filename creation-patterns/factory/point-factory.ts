/* 
    Factory
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

    /* 
        Can be reasonable to expose the factory right from the object the factory creates.
        This does couple the factory with the object which breaks the open close principle, but
        it does provide a nice api.
    */

    static get factory() {
        return new PointFactory();
    }
}

class PointFactory {
    newCartesianPoint(x: number, y: number) {
        return new Point(x, y);
    }

    newPolarPoint(rho: number, theta: number) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}

let p1 = Point.factory.newCartesianPoint(2, 3);
console.log(p1);

let p2 = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log(p2);
