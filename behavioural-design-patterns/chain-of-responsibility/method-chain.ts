class Creature {
    public name: string;
    public attack: number;
    public defence: number;
    constructor(name: string, attack: number, defence: number) {
        this.name = name;
        this.attack = attack;
        this.defence = defence;
    }

    toString() {
        return `${this.name} (${this.attack}/${this.defence})`;
    }
}

class CreatureModifier {
    public creature: Creature;
    private next: CreatureModifier | null;
    constructor(creature: Creature) {
        this.creature = creature;
        this.next = null;
    }

    add(modifier: CreatureModifier) {
        if (this.next) {
            this.next.add(modifier);
        } else {
            this.next = modifier;
        }
    }

    handle() {
        if (this.next) {
            this.next.handle();
        }
    }
}

class NoBonusesModifier extends CreatureModifier {
    constructor(creature: Creature) {
        super(creature);
    }

    handle() {
        console.log('No bonuses for you!');
    }
}

class DoubleAttackModifier extends CreatureModifier {
    constructor(creature: Creature) {
        super(creature);
    }

    handle() {
        console.log(`Doubling ${this.creature.name}'s attack`);
        this.creature.attack *= 2;
        super.handle();
    }
}

class IncreaseDefenseModifier extends CreatureModifier {
    constructor(creature: Creature) {
        super(creature);
    }

    handle() {
        if (this.creature.attack <= 2) {
            console.log(`Increasing ${this.creature.name}'s defense`);
            this.creature.defence++;
        }
        super.handle();
    }
}

const goblin = new Creature('Goblin', 1, 1);
console.log(goblin.toString());

const root = new CreatureModifier(goblin);
//root.add(new NoBonusesModifier(goblin));

root.add(new DoubleAttackModifier(goblin));
root.add(new IncreaseDefenseModifier(goblin));

root.handle(); // applies modifier to creature
console.log(goblin.toString());
