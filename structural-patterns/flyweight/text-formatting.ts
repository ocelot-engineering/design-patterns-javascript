// Stores for every character within the class
class FormattedText {
    public plainText: string;
    public caps: boolean[];
    constructor(plainText: string) {
        this.plainText = plainText;
        this.caps = new Array(plainText.length).map(() => false);
    }

    capitalise(start: number, end: number) {
        for (let i = start; i <= end; i++) {
            this.caps[i] = true;
        }
    }

    toString() {
        let buffer = [];
        for (let idx = 0; idx < this.plainText.length; idx++) {
            let c = this.plainText[idx];
            buffer.push(this.caps[idx] ? c.toUpperCase() : c);
        }
        return buffer.join('');
    }
}

// The flyweight example below stores character ranges and formatting separately to save memory.

class TextRange {
    public start: number;
    public end: number;
    public capitalise: boolean;
    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
        this.capitalise = false;
        // other formatting options can go here.
    }

    covers(position: number) {
        return position >= this.start && position <= this.end;
    }
}

class BetterFormattedText {
    public plainText: string;
    public formatting: TextRange[];
    constructor(plainText: string) {
        this.plainText = plainText;
        this.formatting = [];
    }

    getRange(start: number, end: number) {
        const range = new TextRange(start, end);
        this.formatting.push(range);
        return range;
    }

    toString() {
        let buffer = [];
        for (let idx = 0; idx < this.plainText.length; idx++) {
            let c = this.plainText[idx];
            for (let range of this.formatting) {
                if (range.covers(idx) && range.capitalise) {
                    c = c.toUpperCase();
                }
            }
            buffer.push(c);
        }
        return buffer.join('');
    }
}

const text = 'This is a brave new world';
let ft = new FormattedText(text);
ft.capitalise(10, 15);
console.log(ft.toString());

let bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalise = true;
console.log(bft.toString());
