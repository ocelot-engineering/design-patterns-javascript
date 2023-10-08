/* 
    Neural network - Composite pattern
*/

abstract class Connectable {
    public in: Connectable[];
    public out: Connectable[];
    protected items: Connectable[];

    constructor(inCon: Connectable[] = [], outCon: Connectable[] = []) {
        this.in = inCon;
        this.out = outCon;
        this.items = [];
    }

    connectTo(other: Connectable): void {
        for (let from of this) {
            for (let to of other) {
                from.out.push(...to.items);
                to.in.push(...from.items);
            }
        }
    }

    get length() {
        return this.items.length;
    }

    abstract toString(): string;

    [Symbol.iterator]() {
        let returned = false;
        return {
            next: (): IteratorResult<Connectable> => {
                if (!returned) {
                    returned = true;
                    return {
                        value: this,
                        done: false,
                    };
                } else {
                    return {
                        value: undefined,
                        done: true,
                    };
                }
            },
        };
    }
}

class Neuron extends Connectable {
    constructor(inCon: Connectable[] = [], outCon: Connectable[] = []) {
        super(inCon, outCon);
        this.items.push(this);
    }

    toString() {
        return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
    }
}

class NeuronLayer extends Connectable {
    constructor(count: number) {
        super();

        while (count-- > 0) {
            this.items.push(new Neuron(this.in, this.out));
        }
    }

    toString() {
        return `A layer with ${this.length} neurons`;
    }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();
let layer1 = new NeuronLayer(3);
let layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer1);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());

// let neuron1 = new Neuron();
// let neuron2 = new Neuron();
// let neuron3 = new Neuron();
// let layer1 = new NeuronLayer(3);
// let layer2 = new NeuronLayer(4);

// neuron1.connectTo(neuron2);
// neuron2.connectTo(layer1);
// layer1.connectTo(layer2);
// layer2.connectTo(neuron3);

// console.log(neuron1.toString());
// console.log(neuron2.toString());
// console.log(layer1.toString());
// console.log(layer2.toString());

// console.log(neuron1);
// console.log(layer1);
