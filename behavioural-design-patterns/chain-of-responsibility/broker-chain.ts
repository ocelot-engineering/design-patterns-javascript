class Event1 {
    public handlers: Map<number, any>;
    private count: number;
    constructor() {
        this.handlers = new Map();
        this.count = 0;
    }

    subscribe(handler: any) {
        this.handlers.set(++this.count, handler);
        return this.count;
    }

    unsubscribe(idx: number) {
        this.handlers.delete(idx);
    }

    publish(sender: Creature1, args: Query) {
        this.handlers.forEach(function (value, key) {
            value(sender, args);
        });
    }
}

enum WhatToQuery {
    attack = 1,
    defence = 2,
}

class Query {
    public creatureName: string;
    public whatToQuery: WhatToQuery;
    public value: any;
    constructor(creatureName: string, whatToQuery: WhatToQuery, value: any) {
        this.creatureName = creatureName;
        this.whatToQuery = whatToQuery;
        this.value = value;
    }
}

class Game {
    public queries: Event1;
    constructor() {
        this.queries = new Event1();
    }

    performQuery(sender: Creature1, query: Query) {
        this.queries.publish(sender, query);
    }
}

class Creature1 {
    public game: Game;
    public name: string;
    private initialAttack: number;
    private initialDefence: number;
    constructor(game: Game, name: string, attack: number, defence: number) {
        this.game = game;
        this.name = name;
        this.initialAttack = attack;
        this.initialDefence = defence;
    }

    get attack() {
        const query = new Query(
            this.name,
            WhatToQuery.attack,
            this.initialAttack
        );
        this.game.performQuery(this, query);
        return query.value;
    }

    get defence() {
        const query = new Query(
            this.name,
            WhatToQuery.defence,
            this.initialDefence
        );
        this.game.performQuery(this, query);
        return query.value;
    }

    toString() {
        return `${this.name}: (${this.attack}/${this.defence})`;
    }
}

abstract class CreatureModifier1 {
    public game: Game;
    public creature: Creature1;
    private token: number;
    constructor(game: Game, creature: Creature1) {
        this.game = game;
        this.creature = creature;
        this.token = game.queries.subscribe(this.handle.bind(this));
    }

    handle(sender: Creature1, query: Query) {
        // implement in inheritors
    }

    dispose() {
        this.game.queries.unsubscribe(this.token);
    }
}

class DoubleAttackModifier1 extends CreatureModifier1 {
    constructor(game: Game, creature: Creature1) {
        super(game, creature);
    }

    handle(sender: Creature1, query: Query) {
        if (
            query.creatureName === this.creature.name &&
            query.whatToQuery === WhatToQuery.attack
        ) {
            query.value *= 2;
        }
    }
}

class IncreaseDefenseModifier1 extends CreatureModifier1 {
    constructor(game: Game, creature: Creature1) {
        super(game, creature);
    }

    handle(sender: Creature1, query: Query) {
        if (
            query.creatureName === this.creature.name &&
            query.whatToQuery === WhatToQuery.defence
        ) {
            query.value += 2;
        }
    }
}

const game = new Game();
const troll = new Creature1(game, 'Strong Troll', 2, 2);
console.log(troll.toString());

let dam = new DoubleAttackModifier1(game, troll);
console.log(troll.toString());

let idm = new IncreaseDefenseModifier1(game, troll);
console.log(troll.toString());
idm.dispose();

dam.dispose();
console.log(troll.toString());
