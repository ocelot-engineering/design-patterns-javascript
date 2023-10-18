// Proxy of a simple type so that it is used correctly

// valueOf causes issues with TypeScript compiler, which is why this is written in JavaScript.

class Percentage {
    constructor(percent) {
        this.percent = percent;
    }

    toString() {
        return `${this.percent}`;
    }

    valueOf() {
        return this.percent / 100;
    }
}

const fivePercent = new Percentage(5);
console.log(fivePercent);
console.log(`${fivePercent} of 50 is ${50 * fivePercent}`);
