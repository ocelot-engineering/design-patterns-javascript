// Protection proxy controls access to a particular resource

class Car {
    drive(): void {
        console.log('Car is being driven');
    }
}

class CarProxy {
    public driver: Driver;
    private _car: Car;
    constructor(driver: Driver) {
        this.driver = driver;
        this._car = new Car();
    }

    drive(): void {
        if (this.driver.age >= 18) {
            this._car.drive();
        } else {
            console.log('Driver too young');
        }
    }
}

class Driver {
    public age: number;
    constructor(age: number) {
        this.age = age;
    }
}

let car0 = new Car();
car0.drive();

let car1 = new CarProxy(new Driver(12));
car1.drive();

let car2 = new CarProxy(new Driver(22));
car2.drive();
