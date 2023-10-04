# Design Patterns

Examples of common software design patterns.

Run:

```
ts-node <path-to-file.ts>
```

## Patterns

### Creation

#### Builder

-   When piecewide object construction is complicated, provide an API for doing it succinctly.

#### Factory

-   A component responsible for the wholesale (not piecewise) creation of objects.
-   Factory Method: a method (usually static) that is used to construct an object.
-   Factory: taking the factory methods out of the original class and putting them into their own class.
-   Abstract Factory: encapsulates individual factories that have a common theme, without detailing the instantiation logic.

#### Prototype

-   A partially or fully initalised object that is cloned, then made use of.
-   Can have a prototype factory that provides different prototypes.
-   To implement a prototype, partially construct an object and store it somewhere.
-   Prototype must be deep copied, then customise the resulting instance.
-   A factory is a convenient API for using prototypes.
-   Can create a centralised prototype registery that stores a catalog of frequently used prototypes.

#### Singleton

-   A component which is instantiated only once.

## Miscellaneous notes

-   Fluent interfaces return this so calls can be chained.

## References

-   [Refactoring Guru: Design Patterns](https://refactoring.guru/design-patterns/typescript)
-   [Design Patterns in Javascript](https://www.udemy.com/course/design-patterns-javascript/)
