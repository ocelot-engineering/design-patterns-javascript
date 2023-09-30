class Code {
    static get indentSize() {
        return 2;
    }

    static indent(indent) {
        return ' '.repeat(indent * Code.indentSize);
    }
}

class MethodBuilder {
    constructor(name) {
        this.name = name;
        this.parameters = [];
        this.children = [];
    }

    addParameter(parameter) {
        this.parameters.push(parameter);
        return this;
    }

    addChild(child) {
        this.children.push(child);
        return this;
    }

    toLines(indent) {
        let code = [];

        let name = `${Code.indent(indent)}${this.name}`;
        let parameters = `(${this.parameters.join(', ')})`;
        let opening = ` {`;
        let topLine = name + parameters + opening;
        let closing = `${Code.indent(indent)}}`;

        code.push(topLine);
        this.children.map((line) =>
            code.push(`${Code.indent(indent + 1)}${line}`)
        );
        code.push(closing);

        return code;
    }
}

class ClassBuilder {
    constructor(className) {
        this.className = className;
        this.fields = [];
    }

    addField(name) {
        this.fields.push(name);
        return this;
    }

    buildContructor() {
        let con = new MethodBuilder('constructor');
        this.fields.map((field) => {
            con.addParameter(field).addChild(`this.${field} = ${field};`);
        });

        return con;
    }

    toString() {
        let code = [];

        code.push(`class ${this.className} {`);

        if (!!this.fields.length) {
            let con = this.buildContructor();
            code.push(...con.toLines(1));
        }

        code.push(`}`);

        return code.join('\n');
    }
}

class CodeBuilder extends ClassBuilder {}

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());

let cb2 = new CodeBuilder('Foo');
console.log(cb2.toString());

// class Person
//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
// }

// class Foo {
// }
