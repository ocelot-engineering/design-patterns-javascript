import { Serialiser } from './copy-through-serialisation';

class Address {
    public suite: number | null;
    public streetAddress: string;
    public city: string;
    constructor(suite: number | null, streetAddress: string, city: string) {
        this.suite = suite;
        this.streetAddress = streetAddress;
        this.city = city;
    }

    toString() {
        return `Suite ${this.suite}, ${this.streetAddress}, ${this.city}`;
    }
}

class Employee {
    public name: number | null;
    public address: Address;
    constructor(name: number | null, address: Address) {
        this.name = name;
        this.address = address;
    }

    toString() {
        return `${this.name} works at ${this.address}`;
    }

    greet() {
        console.log(
            `Hi, my name is ${this.name}, I work at ${this.address.toString()}`
        );
    }
}

class EmployeeFactory {
    /* Build utilities */
    private static serialiser = new Serialiser([Employee, Address]);

    private static newEmployee(proto: Employee, name: string, suite: number) {
        const employee = EmployeeFactory.serialiser.clone(proto);
        employee.name = name;
        employee.address.suite = suite;
        return employee;
    }

    /* Prototypes */
    private static main = new Employee(
        null,
        new Address(null, '123 East Drive', 'London')
    );
    private static aux = new Employee(
        null,
        new Address(null, '321 London Road', 'London')
    );

    /* Factory methods */
    static newMainOfficeEmployee(name: string, suite: number) {
        return this.newEmployee(EmployeeFactory.main, name, suite);
    }

    static newAuxOfficeEmployee(name: string, suite: number) {
        return this.newEmployee(EmployeeFactory.aux, name, suite);
    }
}

const alice = EmployeeFactory.newMainOfficeEmployee('Alice', 1234);
let bob = EmployeeFactory.newAuxOfficeEmployee('Bob', 321);

console.log(alice.toString());
console.log(bob.toString());
