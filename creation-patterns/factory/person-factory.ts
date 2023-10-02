class Person {
    public id: number;
    public name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

class PersonFactory {
    private count: number;
    constructor() {
        this.count = 0;
    }
    createPerson(name: string) {
        const person = new Person(this.count, name);
        this.count += 1;
        return person;
    }
}

const personFactory = new PersonFactory();
const alice = personFactory.createPerson('Alice');
const bob = personFactory.createPerson('Bob');
const charlie = personFactory.createPerson('Charlie');

console.log(alice);
console.log(bob);
console.log(charlie);
