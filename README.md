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
-   A monostate implementation is one where there can be many instances of a class but they all share the same data. (Not a recommended implmentation of the singleton)
-   Directly depending on the Singleton is a bad idea; introduce a dependency instead.

### Structural

#### Adapter

-   A construct which adapts an existing interface X to confirm to the required interface Y.
-   Adapt the interface that you are given with the interface that you need.

#### Bridge

-   Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.
-   Bridge pevents a cartesian product complexity explosion.
-   Decouple abstraction from implementation.
    -   Both abstraction and implementation exist as hierarchies.

#### Composite

-   A mechanism for treating individual (scalar) objects and compositions of objects in a uniform manner.

#### Decorator

-   Facilitates the addition of behaviors to individual objects without inheriting from them.
-   A decorator class usually takes a reference to the object it is decorating.
-   Adds utility fields and methods to augment the objects features.

#### Façade

-   Provides a simple, easy to understand/user inferface over a large and sophisticated body of code.
-   May wish to (optionally) expose the internals through the façade.
-   May allow users to "escalate" to user more complex APIs if they need to.

#### Flyweight

-   A space optimisation technique that lets us use less memory by storing externally the data associated with similar objects.
-   Store common data externally.
-   Specify an index or reference into the external data store.
-   Define the idea of a homogeneous collections and store data related to those ranges.
-   Avoids redundancy when storing data.

#### Proxy

-   A class that functions as an interface to a particular resource, That resource may be remote, expensive to construct, or may require logging or some other added functionality.
-   A proxy has the same interface as the underlying object.
-   To create a proxy, simply replicate the existing interface of an object.
-   Add relevant functionality to the redefined member functions.
-   Different proxies (communication, logging, caching, etc.) have completely different behaviours.

## Miscellaneous notes

-   Fluent interfaces return this so calls can be chained.

## References

-   [Refactoring Guru: Design Patterns](https://refactoring.guru/design-patterns/typescript)
-   [Design Patterns in Javascript](https://www.udemy.com/course/design-patterns-javascript/)
