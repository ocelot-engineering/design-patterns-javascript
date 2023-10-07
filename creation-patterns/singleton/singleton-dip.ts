import fs from 'fs';
import path from 'path';

/* 
    This singleton can be a problem if you introduce a direct dependency on a low level module.
    But this can be resolved using dependency inversion 
*/

abstract class Database {
    abstract capitals: Record<string, number>;

    getPopulation(city: string): number {
        return this.capitals[city];
    }
}

export class MyDatabase extends Database {
    private static instance: MyDatabase;
    public capitals: Record<string, number> = {};

    constructor() {
        super();
        const lines = fs
            .readFileSync(path.join(__dirname, 'capitals.txt'))
            .toString()
            .split('\n');

        for (let i = 0; i < lines.length / 2; ++i) {
            this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
        }
    }

    public static getInstance(): MyDatabase {
        if (!MyDatabase.instance) {
            console.log('Initalising database...');
            MyDatabase.instance = new MyDatabase();
        }
        return MyDatabase.instance;
    }
}

/* 
    SingletonRecordFinder is difficult to unit test since it depends on MyDatabase.
    It can only really be integration tested at the moment, which is no good, because
    we want to test totalPopulation without having to worry about MyDatabase.
    The solution to this is dependency inversion, see ConfigurableRecordFinder
*/
export class SingletonRecordFinder {
    totalPopulation(cities: string[]) {
        return cities
            .map((city: string) => MyDatabase.getInstance().getPopulation(city))
            .reduce((pop1: number, pop2: number) => pop1 + pop2);
    }
}

/*
    ConfigurableRecordFinder solves the issue of SingletonRecordFinder since we can
    pass a database into it. Therefore we should create a DummyDatabse for testing.
*/

export class ConfigurableRecordFinder {
    public database: MyDatabase;

    constructor(database: MyDatabase = new MyDatabase()) {
        this.database = database;
    }

    totalPopulation(cities: string[]): number {
        return cities
            .map((city: string) => {
                return this.database.getPopulation(city);
            })
            .reduce((pop1: number, pop2: number) => pop1 + pop2);
    }
}

export class DummyDatabase extends Database {
    public capitals: Record<string, number> = {};

    constructor() {
        super();
        this.capitals = {
            alpha: 1,
            beta: 2,
            gamma: 3,
        };
    }
}

// Run test: npm test creation-patterns/singleton/singleton-dip.test.ts
