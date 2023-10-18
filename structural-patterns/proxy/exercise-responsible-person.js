class Person {
    constructor(age = 0) {
        this.age = age;
    }

    drink() {
        return 'drinking';
    }
    drive() {
        return 'driving';
    }
    drinkAndDrive() {
        return 'driving while drunk';
    }
}

class ResponsiblePerson {
    constructor(person) {
        this.person = person;
    }

    get age() {
        return this.person.age;
    }

    set age(value) {
        this.person.age = value;
    }

    drink() {
        if (this.age >= 18) {
            return this.person.drink();
        } else {
            return 'too young';
        }
    }
    drive() {
        if (this.age >= 16) {
            return this.person.drive();
        } else {
            return 'too young';
        }
    }
    drinkAndDrive() {
        return 'dead';
    }
}

let p = new Person(10);
let rp = new ResponsiblePerson(p);

console.log(rp.drive());
console.log(rp.drink());
console.log(rp.drinkAndDrive());

rp.age = 20;

console.log(rp.drive());
console.log(rp.drink());
console.log(rp.drinkAndDrive());
