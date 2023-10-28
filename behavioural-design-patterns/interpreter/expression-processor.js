// Tokens
class Token {
    constructor(type, text) {
        this.type = type;
        this.text = text;
    }
}

const TokenType = Object.freeze({
    term: 0,
    plus: 1,
    minus: 2,
});

// Binary Operations
class BinaryOperation {
    constructor() {
        this.type = null;
        this.left = null;
        this.right = null;
    }

    get value() {
        let result;
        switch (this.type) {
            // Recursively uses the value getter
            case Operation.addition:
                result = this.left.value + this.right.value;
                break;
            case Operation.subtraction:
                result = this.left.value - this.right.value;
                break;
            default:
                result = NaN;
                break;
        }

        if (!isNaN(result)) {
            return result;
        } else {
            return 0;
        }
    }
}

const Operation = Object.freeze({
    addition: 0,
    subtraction: 1,
});

// Terms
class Term {
    constructor(term) {
        if (variables[term]) {
            this.value = parseInt(variables[term]);
        } else if (Number.isInteger(parseInt(term))) {
            this.value = parseInt(term);
        } else {
            this.value = NaN;
        }
    }
}

function isTerm(value) {
    return !'+-'.includes(value);
}

function isVariable(value) {
    return variables.includes(value);
}

// Expression processing
class ExpressionProcessor {
    constructor() {
        // todo
    }

    lex(expression) {
        let tokens = [];
        for (let i = 0; i < expression.length; ++i) {
            // Cases check for operations
            // Default case assumes a term
            switch (expression[i]) {
                case '+':
                    tokens.push(new Token(TokenType.plus, '+'));
                    break;
                case '-':
                    tokens.push(new Token(TokenType.minus, '-'));
                    break;
                default:
                    let buffer = [expression[i]];
                    let value;
                    for (let j = i + 1; j < expression.length; ++j) {
                        value = expression[j];
                        if (isTerm(value)) {
                            buffer.push(value);
                            ++i;
                        } else {
                            break;
                        }
                    }
                    tokens.push(new Token(TokenType.term, buffer.join('')));
                    break;
            }
        }
        return tokens;
    }

    parse(tokens) {
        const result = new BinaryOperation();

        for (let idx = 0; idx < tokens.length; ++idx) {
            switch (tokens[idx].type) {
                case TokenType.term:
                    if (!result.left) {
                        result.left = new Term(tokens[idx].text);
                    } else {
                        result.right = new Term(tokens[idx].text);
                    }
                    break;
                case TokenType.plus:
                    result.type = Operation.addition;
                    break;
                case TokenType.minus:
                    result.type = Operation.subtraction;
                    break;
            }
            if (result.right && idx < tokens.length - 1) {
                const subTotalToken = new Token(
                    TokenType.term,
                    `${result.value}`
                );
                const remainingTokens = [subTotalToken].concat(
                    tokens.slice(idx + 1, tokens.length)
                );

                return this.parse(remainingTokens);
            }
        }
        return result.value;
    }

    calculate(expression) {
        const tokens = this.lex(expression);
        // return tokens;
        return this.parse(tokens);
    }
}

const variables = { x: 3, y: 5, xy: 33 };
const expressionProcessor = new ExpressionProcessor();

console.log(expressionProcessor.calculate('1+2+3'));
console.log(expressionProcessor.calculate('1+2+xy'));
console.log(expressionProcessor.calculate('10-2-x'));
console.log(expressionProcessor.calculate('1000-2-x'));
