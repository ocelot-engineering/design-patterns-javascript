class Integer {
    public value: number;
    constructor(value: number) {
        this.value = value;
    }
}

enum Operation {
    addition = 0,
    subtraction = 1,
}

class BinaryOperation {
    public type: Operation;
    public left: Integer | BinaryOperation;
    public right: Integer | BinaryOperation;
    constructor() {
        this.type = null;
        this.left = null;
        this.right = null;
    }

    get value() {
        switch (this.type) {
            // Recursively uses the value getter
            case Operation.addition:
                return this.left.value + this.right.value;
            case Operation.subtraction:
                return this.left.value - this.right.value;
            default:
                return 0;
        }
    }
}

enum TokenType {
    integer = 0,
    plus = 1,
    minus = 2,
    lparen = 3,
    rparen = 4,
}

class Token {
    public type: TokenType;
    public text: string;
    constructor(type: TokenType, text: string) {
        this.type = type;
        this.text = text;
    }
    toString() {
        return `\`${this.text}\``;
    }
}

/*
    Lexing is splitting up the input into separate tokens.
*/
function lex(input: string): Token[] {
    const result: Token[] = [];

    for (let i = 0; i < input.length; ++i) {
        switch (input[i]) {
            case '+':
                result.push(new Token(TokenType.plus, '+'));
                break;
            case '-':
                result.push(new Token(TokenType.minus, '-'));
                break;
            case '(':
                result.push(new Token(TokenType.lparen, '('));
                break;
            case ')':
                result.push(new Token(TokenType.rparen, ')'));
                break;
            default: // if a number
                const buffer = [input[i]];
                for (let j = i + 1; j < input.length; ++j) {
                    if ('0123456789'.includes(input[j])) {
                        buffer.push(input[j]);
                        ++i;
                    } else {
                        result.push(
                            new Token(TokenType.integer, buffer.join(''))
                        );
                        break;
                    }
                }
                break;
        }
    }
    return result;
}

function parse(tokens: Token[]): BinaryOperation {
    const result = new BinaryOperation();
    let haveLHS = false;

    for (let i = 0; i < tokens.length; ++i) {
        let token = tokens[i];

        switch (token.type) {
            case TokenType.integer:
                const integer = new Integer(parseInt(token.text));
                if (!haveLHS) {
                    result.left = integer;
                    haveLHS = true;
                } else {
                    result.right = integer;
                }
                break;
            case TokenType.plus:
                result.type = Operation.addition;
                break;
            case TokenType.minus:
                result.type = Operation.subtraction;
                break;
            case TokenType.lparen:
                let j = i;
                for (; j < tokens.length; ++j) {
                    if (tokens[j].type === TokenType.rparen) {
                        break; // breaks due to end of sub-expression
                    }
                }

                const subexpr = tokens.slice(i + 1, j);
                const element = parse(subexpr);
                console.log(element);
                if (!haveLHS) {
                    result.left = element;
                    haveLHS = true;
                } else {
                    result.right = element;
                }
                i = j; // advance the parent for loop
                break;
        }
    }
    return result;
}

let input = '(13+4)-(12+1)';
let tokens = lex(input);
console.log(tokens.join('  '));

let parsed = parse(tokens);
console.log(`${input} = ${parsed.value}`);
