class Sentence {
    constructor(plainText) {
        this.terms = plainText.split(' ');
        this.formatting = [];
    }

    at(index) {
        let textFormat = new TextFormatting(index);
        this.formatting[index] = textFormat;
        return this.formatting[index];
    }

    toString() {
        let buffer = this.terms;
        for (let textFormat of this.formatting) {
            if (!textFormat) {
                continue;
            }
            buffer[textFormat.index] =
                this.terms[textFormat.index].toUpperCase();
        }
        return buffer.join(' ');
    }
}

class TextFormatting {
    constructor(index) {
        this.index = index;
        this.capitalise = false;
    }
}

let s = new Sentence('alpha beta gamma');
s.at(1).capitalise = true;
console.log(s.toString()); // alpha BETA gamma
