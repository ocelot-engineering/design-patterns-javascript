import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface HotDrink {
    consume(): void;
}

class Tea implements HotDrink {
    consume(): void {
        console.log('This tea is nice with lemon!');
    }
}

class Coffee implements HotDrink {
    consume(): void {
        console.log(`This coffee is delicious!`);
    }
}

interface HotDrinkFactory {
    prepare(amount: number): HotDrink;
}

class TeaFactory implements HotDrinkFactory {
    prepare(amount: number): HotDrink {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`);
        return new Tea(); // Generally this could be customised rather than calling without args
    }
}

class CoffeeFactory implements HotDrinkFactory {
    prepare(amount: number): HotDrink {
        console.log(`Grind some beans, boil water, pour ${amount}ml`);
        return new Coffee();
    }
}

interface HotDrinkConstructor {
    new (): HotDrinkFactory;
}

const AvailableDrinks: Record<string, HotDrinkConstructor> = {
    coffee: CoffeeFactory,
    tea: TeaFactory,
};

class HotDrinkMachine {
    private factories: {
        [key: string]: HotDrinkFactory;
    };
    constructor() {
        this.factories = {};
        for (let drink of Object.keys(AvailableDrinks)) {
            this.factories[drink] = new AvailableDrinks[drink]();
        }
    }

    interact(consumer: Function) {
        rl.question(
            'Please specify drink and the amount (e.g. tea 50): ',
            (answer: string) => {
                const answerParts = answer.split(' ');
                const drinkType = answerParts[0];
                const amount = parseInt(answerParts[1]);
                const drink = this.factories[drinkType].prepare(amount);
                rl.close();
                consumer(drink);
            }
        );
    }
}

const machine = new HotDrinkMachine();

const consumer = function (drink: HotDrink) {
    drink.consume();
};

machine.interact(consumer);
