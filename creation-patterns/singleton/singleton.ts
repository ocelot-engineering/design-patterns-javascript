class Singleton {
    private static instance: Singleton;

    constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    foo() {
        console.log('Doing something...');
    }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log('Are they identical? ' + (s1 === s1));
s1.foo();
