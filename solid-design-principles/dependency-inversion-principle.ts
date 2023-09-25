enum Relationship {
    parent = 0,
    child = 1,
    sibling = 2,
}

class Person {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Low level (storage)

interface RelationshipBrowser {
    findAllChildrenOf(name: string): Person[];
}

interface RelationshipPair {
    from: Person;
    type: Relationship;
    to: Person;
}

class Relationships implements RelationshipBrowser {
    public data: RelationshipPair[];
    constructor() {
        this.data = [];
    }

    addParentAndChild(parent: Person, child: Person) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child,
        });
        this.data.push({
            from: child,
            type: Relationship.child,
            to: parent,
        });
    }

    findAllChildrenOf(name: string): Person[] {
        return this.data
            .filter(
                (r) => r.from.name === name && r.type === Relationship.parent
            )
            .map((r) => r.to);
    }
}

// High Level (research)

class Research {
    // constructor(relationships: Relationships) {
    //     // problem: direct dependence on storage mechanic
    //     let relations = relationships.data;
    //     for (let rel of relations.filter(
    //         (r) => r.from.name === 'John' && r.type === Relationship.parent
    //     )) {
    //         console.log(`John has a child named ${rel.to.name}`);
    //     }
    // }
    constructor(browser: RelationshipBrowser) {
        for (let p of browser.findAllChildrenOf('John')) {
            console.log(`John has a child named ${p.name}`);
        }
    }
}

let parent1 = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

// low-level module
let rels = new Relationships();
rels.addParentAndChild(parent1, child1);
rels.addParentAndChild(parent1, child2);

new Research(rels);
