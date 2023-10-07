class Shape {
    public name: string;
    private renderer: Renderer;
    constructor(name: string, renderer: Renderer) {
        this.name = name;
        this.renderer = renderer;
    }
    toString() {
        return `Drawing ${this.name} as ${this.renderer.outputType}`;
    }
}

class Triangle extends Shape {
    constructor(renderer: Renderer) {
        super('triangle', renderer);
    }
}

class Square extends Shape {
    constructor(renderer: Renderer) {
        super('square', renderer);
    }
}

interface Renderer {
    outputType: string;
}

class VectorRenderer implements Renderer {
    get outputType() {
        return 'lines';
    }
}

class RasterRenderer implements Renderer {
    get outputType() {
        return 'pixels';
    }
}

let sq = new Square(new VectorRenderer());
console.log(sq.toString());
let tri = new Triangle(new RasterRenderer());
console.log(tri.toString());
