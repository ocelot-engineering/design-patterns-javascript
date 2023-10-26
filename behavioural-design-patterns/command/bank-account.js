let Action = Object.freeze({
    deposit: 0,
    withdraw: 1,
});

class Command {
    constructor(action, amount) {
        this.action = action;
        this.amount = amount;
        this.success = false;
    }
}

class Account {
    constructor() {
        this.balance = 0;
    }

    process(cmd) {
        switch (cmd.action) {
            case Action.deposit:
                this.balance += cmd.amount;
                cmd.success = true;
                break;
            case Action.withdraw:
                if (cmd.amount <= this.balance) {
                    this.balance -= cmd.amount;
                    cmd.success = true;
                } else {
                    cmd.success = false;
                }
                break;
        }
    }
}

let a = new Account();

console.log('depositing $100');
let command = new Command(Action.deposit, 100);
a.process(command);

console.log(a.balance);
console.log(command.success);
// expect(a.balance).toEqual(100);
// expect(command.success).toEqual(true);

console.log('withdrawing $50');
command = new Command(Action.withdraw, 50);
a.process(command);

console.log(a.balance);
console.log(command.success);
// expect(a.balance).toEqual(50);
// expect(command.success).toEqual(true);

console.log('attempting to withdraw $150');
command.amount = 150;
a.process(command);

console.log(a.balance);
console.log(command.success);
// expect(a.balance).toEqual(50);
// expect(command.success).toEqual(false);
