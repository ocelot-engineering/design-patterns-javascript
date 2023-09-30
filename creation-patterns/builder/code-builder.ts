/*
    Uses the builder pattern to write code to generate a class in typescript
*/

class ClassCode {
    public name: string;
    public parameters: Parameter[];
    constructor(name: string) {
        this.name = name;
        this.parameters = [];
    }

    toArray() {
        let buffer: string[] = [];
        buffer.push(`class ${this.name} {`);

        if (!!this.parameters.length) {
            const parameterNameTypes = this.parameters.map((parameter) =>
                parameter.toString()
            );
            buffer.push(`  constructor(${parameterNameTypes.join(', ')}) {`);
            this.parameters.map((parameter) =>
                buffer.push(`    this.${parameter.name} = ${parameter.name};`)
            );
            buffer.push(`  }`);
        }
        buffer.push(`}`);

        return buffer;
    }

    toString() {
        return this.toArray().join('\n');
    }
}

class Parameter {
    public name: string;
    public type: string;
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    toString() {
        return `${this.name}: ${this.type}`;
    }
}

class ClassCodeBuilder {
    private classCode: ClassCode;
    constructor(name: string) {
        this.classCode = new ClassCode(name);
    }

    addParameter(name: string, type: string) {
        this.classCode.parameters.push(new Parameter(name, type));
        return this;
    }

    build() {
        return this.classCode;
    }
}

// Use the class code builder to write code to create some classes
const classCodeBuilder = new ClassCodeBuilder('Person');
const classCode = classCodeBuilder
    .addParameter('name', 'string')
    .addParameter('age', 'number')
    .addParameter('height', 'number')
    .build();
console.log(classCode.toString());

const classCodeBuilder2 = new ClassCodeBuilder('Foo');
const classCode2 = classCodeBuilder2.build();
console.log(classCode2.toString());

/*  --- OUTPUTS ---

class Person {
  constructor(name: string, age: number, height: number) {
    this.name = name;
    this.age = age;
    this.height = height;
  }
}

class Foo {
}

*/
