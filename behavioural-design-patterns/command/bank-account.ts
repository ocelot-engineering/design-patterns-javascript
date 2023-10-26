// Bank Account example of command pattern
// Action encapsulated into a second class and have that class call that method

class BankAccount {
    public balance: number;
    public static overdraftLimit = -500;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): boolean {
        this.balance += amount;
        console.log(`Deposited ${amount}, balance is now ${this.balance}`);
        return true;
    }

    withdraw(amount: number): boolean {
        if (this.balance - amount >= BankAccount.overdraftLimit) {
            this.balance -= amount;
            console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
            return true;
        }
        return false;
    }

    toString() {
        return `Balance: ${this.balance}`;
    }
}

enum Action {
    deposit = 1,
    withdraw = 2,
}

class BankAccountCommand {
    public account: BankAccount;
    public action: Action;
    public amount: number;
    public succeeded: boolean;
    constructor(account: BankAccount, action: Action, amount: number) {
        this.account = account;
        this.action = action;
        this.amount = amount;
        this.succeeded = false;
    }

    call() {
        switch (this.action) {
            case Action.deposit:
                this.succeeded = this.account.deposit(this.amount);
                break;
            case Action.withdraw:
                this.succeeded = this.account.withdraw(this.amount);
                break;
        }
    }
    undo() {
        if (!this.succeeded) {
            return;
        }
        switch (this.action) {
            case Action.deposit:
                this.account.withdraw(this.amount);
                break;
            case Action.withdraw:
                this.account.deposit(this.amount);
                break;
        }
    }
}

const bankAccount = new BankAccount(100);

const deposit650 = new BankAccountCommand(bankAccount, Action.deposit, 650);
deposit650.call();
console.log(bankAccount.toString());
deposit650.undo();
console.log(bankAccount.toString());
