class GraphicObject {
    private static count: number = 0;
    private _name: string;
    public children: GraphicObject[];
    public color: string | undefined;

    constructor(name: string = 'Group ' + GraphicObject.count++) {
        this._name = name;
        this.children = [];
        this.color = undefined;
    }

    get name() {
        return this._name;
    }

    print(buffer: string[], depth: number) {
        buffer.push('*'.repeat(depth));
        if (depth > 0) {
            buffer.push(' ');
        }
        if (this.color) {
            buffer.push(this.color + ' ');
        }
        buffer.push(this.name);
        buffer.push('\n');

        for (let child of this.children) {
            child.print(buffer, depth + 1);
        }
    }

    toString() {
        let buffer: string[] = [];
        this.print(buffer, 0);
        return buffer.join('');
    }
}

class Circle extends GraphicObject {
    public color: string | undefined;
    constructor(color: string | undefined) {
        super('Circle');
        this.color = color;
    }
}

class Square extends GraphicObject {
    public color: string | undefined;
    constructor(color: string | undefined) {
        super('Square');
        this.color = color;
    }
}

let drawing = new GraphicObject();
drawing.children.push(new Square('Red'));
drawing.children.push(new Circle('Green'));

let group = new GraphicObject();
group.children.push(new Square('blue'));
group.children.push(new Circle('black'));
drawing.children.push(group);

console.log(drawing.toString());
