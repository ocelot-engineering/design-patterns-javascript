import fs from 'fs';
/*
    Single Responsibility Principle
*/

class Journal {
    public entries: Map<number, string>;
    constructor() {
        this.entries = new Map();
    }

    addEntry(text: string): number {
        let c = this.entries.size + 1;
        let entry = `${c}: ${text}`;
        this.entries.set(c, entry);
        // this.entries[c] = entry;
        return c;
    }

    removeEntry(index: number): void {
        this.entries.delete(index);
        // delete this.entries[index]
    }

    toString(): string {
        return Array.from(this.entries.values()).join('\n');
    }
}

class PersistenceManager {
    preprocess(journal: Journal) {
        // TODO
    }

    saveToFile(journal: Journal, filename: string) {
        fs.writeFileSync(filename, journal.toString());
    }
}

let j = new Journal();
j.addEntry('I laughed today.');
j.addEntry('I ate a cake.');
console.log(j.toString());

let p = new PersistenceManager();
let filename = 'journal.txt';
// p.saveToFile(j, filename);
