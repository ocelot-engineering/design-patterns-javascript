class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class PersonFactory {
    constructor() {
        this.count = 0;
    }
    createPerson(name) {
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
