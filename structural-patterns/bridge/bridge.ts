// Shape: Square, Circle, Triangle, ...
// Colour: Blue, Red
// Bad result is state space explosion of classes: RedSquare, BlueSquare, RedCircle, BlueCircle, ...

/*
    This problem occurs because we're trying to extend the shape classes in two independent 
    dimensions: by form and by color. That’s a very common issue with class inheritance.

    The Bridge pattern attempts to solve this problem by switching from inheritance to 
    the object composition. What this means is that you extract one of the dimensions 
    into a separate class hierarchy, so that the original classes will reference an object 
    of the new hierarchy, instead of having all of its state and behaviors within one class.
*/

// Solution
class Color {
    public name: string;
    public hex: string;
    public rgb: { red: number; green: number; blue: number };
    public cmyk: {
        cyan: number;
        magenta: number;
        yellow: number;
        black: number;
    };
    constructor(
        name: string,
        hex: string,
        rgb: { red: number; green: number; blue: number },
        cmyk: {
            cyan: number;
            magenta: number;
            yellow: number;
            black: number;
        }
    ) {
        this.name = name;
        // different ways of representing the same color
    }
}

class Red extends Color {}

class Blue extends Color {}

class Shape {
    public color: Color;
    constructor(color: Color) {
        this.color = color;
    }
}

class Square extends Shape {
    constructor(color: Color) {
        super(color);
    }
}

class Circle extends Shape {
    constructor(color: Color) {
        super(color);
    }
}

// If we need to add triangle, we only extend shape and it has the ability to be any color.
