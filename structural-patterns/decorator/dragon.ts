class Bird {
    public age: number;
    constructor(age: number = 0) {
        this.age = age;
    }

    fly() {
        return this.age < 10 ? 'flying' : 'too old';
    }
}

class Lizard {
    public age: number;
    constructor(age: number = 0) {
        this.age = age;
    }

    crawl() {
        return this.age > 1 ? 'crawling' : 'too young';
    }
}

class Dragon {
    private _age: number;
    private bird: Bird;
    private lizard: Lizard;
    constructor(age: number = 0) {
        this._age = age;
        this.bird = new Bird(age);
        this.lizard = new Lizard(age);
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
        this.bird = new Bird(value);
        this.lizard = new Lizard(value);
    }

    fly() {
        return this.bird.fly();
    }

    crawl() {
        return this.lizard.crawl();
    }
}

const dragon = new Dragon(5);
console.log(dragon.fly());
console.log(dragon.crawl());
