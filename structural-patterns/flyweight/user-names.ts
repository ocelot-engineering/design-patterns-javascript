// Stores each name on the instance - this takes a lot of memory
class User {
    public fullName: string;
    constructor(fullName: string) {
        this.fullName = fullName;
    }
}

// Flyweight caches strings in the class to save repeated names.
class UserFlyweight {
    public static cache: string[] = [];
    public names: number[];

    constructor(fullName: string) {
        this.names = fullName.split(' ').map(UserFlyweight.getOrAdd);
    }

    private static getOrAdd(str: string): number {
        const idx = UserFlyweight.cache.indexOf(str);
        if (idx !== -1) {
            return idx;
        } else {
            UserFlyweight.cache.push(str);
            return UserFlyweight.cache.length - 1;
        }
    }
}

// Test different classes
function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

let randomString = function () {
    let result = [];
    for (let x = 0; x < 10; ++x)
        result.push(String.fromCharCode(65 + getRandomInt(26)));
    return result.join('');
};

let users = [];
let users2 = [];
let firstNames = [];
let lastNames = [];

for (let i = 0; i < 100; ++i) {
    firstNames.push(randomString());
    lastNames.push(randomString());
}

// make 10k users
for (let first of firstNames)
    for (let last of lastNames) {
        users.push(new User(`${first} ${last}`));
        users2.push(new UserFlyweight(`${first} ${last}`));
    }

// ballpark comparison (very unscientific) - actual memory gains are huge!
console.log(`10k users take up approx ${JSON.stringify(users).length} chars`);

let users2length = [users2, UserFlyweight.cache]
    .map((x) => JSON.stringify(x).length)
    .reduce((x, y) => x + y);
console.log(`10k flyweight users take up approx ${users2length} chars`);
