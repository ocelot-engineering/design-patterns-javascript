// Using event broker chain of responsibility

class Goblin {
    constructor(game, baseAttack = 1, baseDefense = 1) {
        this.game = game;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.game.creatures.push(this);
    }

    get attack() {
        const query = new Query(WhatToQuery.attack, 0);
        for (const creature of this.game.creatures) {
            creature.handleQuery(this, query);
        }
        return query.result;
    }

    get defense() {
        const query = new Query(WhatToQuery.defense, 0);
        for (const creature of this.game.creatures) {
            creature.handleQuery(this, query);
        }
        return query.result;
    }

    handleQuery(source, query) {
        if (source === this) {
            if (query.whatToQuery === WhatToQuery.attack) {
                query.result += this.baseAttack;
            }
            if (query.whatToQuery === WhatToQuery.defense) {
                query.result += this.baseDefense;
            }
        } else {
            if (query.whatToQuery === WhatToQuery.defense) {
                query.result++;
            }
        }
    }
}

class GoblinKing extends Goblin {
    constructor(game) {
        super(game, 3, 3);
    }

    handleQuery(source, query) {
        if (source !== this && query.whatToQuery === WhatToQuery.attack) {
            query.result++;
        }
        super.handleQuery(source, query);
    }
}

class Game {
    constructor() {
        this.creatures = [];
    }
}

const WhatToQuery = Object.freeze({
    attack: 1,
    defense: 2,
});

class Query {
    constructor(whatToQuery, result) {
        this.whatToQuery = whatToQuery;
        this.result = result;
    }
}

let game = new Game();
let goblin = new Goblin(game);

console.log(goblin.attack); //.toEqual(1);
console.log(goblin.defense); //.toEqual(1);

let goblin2 = new Goblin(game);

console.log(goblin.attack); //.toEqual(1);
console.log(goblin.defense); //.toEqual(2);

let goblin3 = new GoblinKing(game);

console.log(goblin.attack); //.toEqual(2);
console.log(goblin.defense); //.toEqual(3);
