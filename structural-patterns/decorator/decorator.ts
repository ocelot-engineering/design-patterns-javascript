class Shape {}

class Circle extends Shape {
    public radius: number;
    constructor(radius: number = 0) {
        super();
        this.radius = radius;
    }

    resize(factor: number) {
        this.radius *= factor;
    }

    toString() {
        return `A circle of radius ${this.radius}`;
    }
}

class Square extends Shape {
    public side: number;
    constructor(side: number = 0) {
        super();
        this.side = side;
    }

    toString() {
        return `A square with side ${this.side}`;
    }
}

class ColoredShape extends Shape {
    public shape: Shape;
    public color: string;
    constructor(shape: Shape, color: string) {
        super();
        this.shape = shape;
        this.color = color;
    }

    toString() {
        return `${this.shape.toString()} has the color ${this.color}`;
    }
}

class TransparentShape extends Shape {
    public shape: Shape;
    public transparency: number;
    constructor(shape: Shape, transparency: number) {
        super();
        this.shape = shape;
        this.transparency = transparency;
    }

    toString() {
        return `${this.shape.toString()} has ${
            this.transparency * 100
        }% transparency`;
    }
}

let circle = new Circle(2);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);

let redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());
