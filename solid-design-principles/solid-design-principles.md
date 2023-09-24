## SOLID Design Priciples

### Single Responsibility Principle (SRP)

-   A class should have a single responsibility and therefore, only one reason to change.
-   This ensures separation of concerns.

### Open/Closed Principle (OCP)

-   A class is open for extension, but closed for modification.
-   Modification includes editing an existing method as well as adding a new method.
-   Extension

### Liskov Substitution Principle (LSP)

-   Subtypes should be substitutable with their base types without altering the correctness of the program. (i.e. subclasses can stand in for their base classes)

### Interface Segregation Principle (ISP)

-   Clients should not be forced to depend on interfaces they do not use.
-   Interfaces should be split up into smaller interfaces.

### Dependency Inversion Principle (DIP)

-   Defines a relationship between low level and high level modules.
-   High level modules should not depend on low level modules, instead they should both depend on abstractions.
-   Abstractions should not depend on details, but details should depend on abstractions.
-   I.e. instead of writing code that relies on specific details of how lower level code works, you should write code that depends on more general abstractions that can be implemented in different ways.
