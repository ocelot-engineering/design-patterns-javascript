// Property proxy allows for a property to map to an instance of a class
// the below example shows that is useful for forcing the setter to log to the console.

class Property {
    private _value: number;
    private name: string;
    constructor(value: number, name: string = '') {
        this._value = value;
        this.name = name;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (this._value === newValue) {
            return;
        }
        console.log(`Assigning ${newValue} to ${this.name}`);
        this._value = newValue;
    }
}

class Creature {
    private _agility: Property;
    constructor() {
        this._agility = new Property(10, 'agility');
    }

    get agility() {
        return this._agility.value;
    }

    set agility(value: number) {
        this._agility.value = value;
    }
}

let creature = new Creature();
creature.agility = 12;
creature.agility = 13;
