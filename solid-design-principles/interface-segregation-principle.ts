class Doc {}
interface Machine {
    print(doc: Doc): void;
    fax(doc: Doc): void;
    scan(doc: Doc): void;
}

class MultiFunctionPrinter implements Machine {
    print(doc: Doc) {
        //
    }
    fax(doc: Doc) {
        //
    }
    scan(doc: Doc) {
        //
    }
}

class NotImplementedError extends Error {
    constructor(name: string) {
        let msg = `${name} is not implemented`;
        super(msg);
        // maintain proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError);
        }
    }
}

class OldFashionedPrinter implements Machine {
    print(doc: Doc) {
        // ok
    }
    fax(doc: Doc) {
        // do nothing
    }
    scan(doc: Doc) {
        // throw error - this is annoying for the developer to implement when extending
        throw new NotImplementedError('OldFashionedPrinter.scan');
    }
}

// Solution
// Split up into smaller interfaces

interface Printer {
    print(doc: Doc): void;
}

interface Scanner {
    scan(doc: Doc): void;
}

interface Fax {
    fax(doc: Doc): void;
}

const doc = new Doc();

let printer = new OldFashionedPrinter();
printer.fax(doc);
