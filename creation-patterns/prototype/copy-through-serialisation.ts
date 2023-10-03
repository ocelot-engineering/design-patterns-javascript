class Address {
    public streetAddress: string;
    public city: string;
    public country: string;
    constructor(streetAddress: string, city: string, country: string) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }

    toString() {
        return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
    }
}

class Person {
    public name: string;
    public address: Address;
    constructor(name: string, address: Address) {
        this.name = name;
        this.address = address;
    }

    toString() {
        return `${this.name} lives at ${this.address}`;
    }

    greet() {
        console.log(
            `Hi, my name is ${this.name}, I live at ${this.address.toString()}`
        );
    }
}

export class Serialiser {
    private types: any[];
    constructor(types: any[]) {
        this.types = types;
    }

    /**
     * Recursively mark types of each object so they can be reconstructed later
     * @param object
     */
    markTypes(object: any) {
        const idx = this.types.findIndex((t: any) => {
            return t.name === object.constructor.name;
        });

        if (idx !== -1) {
            object['typeIndex'] = idx;

            for (let key in object) {
                if (object.hasOwnProperty(key) && object[key] != null) {
                    this.markTypes(object[key]);
                }
            }
        }
    }

    /**
     * Reconstruct an object
     * @param jsonParsedObject object that has been stringified and parsed back.
     * @returns object
     */
    reconstruct(jsonParsedObject: any) {
        if (jsonParsedObject.hasOwnProperty('typeIndex')) {
            const objectType = this.types[jsonParsedObject.typeIndex];
            const reconstructedObject = new objectType();

            for (let key in jsonParsedObject) {
                if (
                    jsonParsedObject.hasOwnProperty(key) &&
                    jsonParsedObject[key] != null
                ) {
                    reconstructedObject[key] = this.reconstruct(
                        jsonParsedObject[key]
                    );
                }
            }
            delete reconstructedObject.typeIndex;
            return reconstructedObject;
        }
        return jsonParsedObject;
    }

    clone(object: any) {
        this.markTypes(object);
        const copiedObject = JSON.parse(JSON.stringify(object));
        return this.reconstruct(copiedObject);
    }
}

const alice = new Person(
    'Alice',
    new Address('123 London Road', 'London', 'UK')
);

// Does not work
// let bob = JSON.parse(JSON.stringify(alice));

// bob.name = 'Bob';
// bob.address.streetAddress = '321 Other St';

// Works with serialiser
let ser = new Serialiser([Person, Address]);
const bob = ser.clone(alice);

bob.name = 'Bob';
bob.address.streetAddress = '321 Other St';

console.log(alice.toString());
console.log(bob.toString());
