import {
    MyDatabase,
    SingletonRecordFinder,
    ConfigurableRecordFinder,
    DummyDatabase,
} from './singleton-dip';

// Run test: npm test creation-patterns/singleton/singleton-dip.test.ts

describe('singleton database', function () {
    test('is a singleton', function () {
        const db1 = MyDatabase.getInstance();
        const db2 = MyDatabase.getInstance();
        expect(db1).toBe(db2);
    });

    test('calculates total population', function () {
        let rf = new SingletonRecordFinder();
        let cities = ['Seoul', 'Mexico City'];
        let tp = rf.totalPopulation(cities);
        expect(tp).toEqual(17400000 + 17500000);
    });

    test('calculates total population better', function () {
        let db = new DummyDatabase();
        let rf = new ConfigurableRecordFinder(db);
        expect(rf.totalPopulation(['alpha', 'gamma'])).toEqual(4);
    });
});
