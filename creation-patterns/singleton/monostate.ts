/* Makes sure all the data is shared between instances */

class ChiefExecutiveOfficer {
    private static firstName: string;
    private static age: number;

    get name() {
        return ChiefExecutiveOfficer.firstName;
    }
    set name(value) {
        ChiefExecutiveOfficer.firstName = value;
    }

    get age() {
        return ChiefExecutiveOfficer.age;
    }
    set age(value) {
        ChiefExecutiveOfficer.age = value;
    }

    toString() {
        return `CEO's name is ${this.name} and they are ${this.age} years old.`;
    }
}

const ceo = new ChiefExecutiveOfficer();
ceo.name = 'Alice';
ceo.age = 30;

const ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'Bob';
ceo2.age = 40;

console.log(ceo.toString());
console.log(ceo2.toString());
