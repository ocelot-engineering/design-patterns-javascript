enum Color {
    red = 'red',
    green = 'green',
    blue = 'blue',
}

enum Size {
    small = 'small',
    medium = 'medium',
    large = 'large',
}

class Product {
    public name: string;
    public color: Color;
    public size: Size;

    constructor(name: string, color: Color, size: Size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProductFilter {
    filterByColor(products: Product[], color: Color) {
        return products.filter((p) => p.color === color);
    }

    filterBySize(products: Product[], size: Size) {
        return products.filter((p) => p.size === size);
    }

    filterByColorAndSize(products: Product[], color: Color, size: Size) {
        return products.filter((p) => p.color === color && p.size === size);
    }

    // state space explosion...
    // too much work to write all method especially if there is more critera
}

// Can solve using the specification pattern
// If we want a specific filtering critera, we specify a class that defines that filtering

// Specifications
interface Specification {
    isSatisfied(item: Product): boolean;
}

class ColorSpecification implements Specification {
    public color: Color;
    constructor(color: Color) {
        this.color = color;
    }

    isSatisfied(item: Product): boolean {
        return item.color == this.color;
    }
}

class SizeSpecification implements Specification {
    public size: Size;
    constructor(size: Size) {
        this.size = size;
    }

    isSatisfied(item: Product): boolean {
        return item.size == this.size;
    }
}

class AndSpecification implements Specification {
    public specs: Specification[];
    constructor(...specs: Specification[]) {
        this.specs = specs;
    }

    isSatisfied(item: Product): boolean {
        return this.specs.every((x) => x.isSatisfied(item));
    }
}

// Using specifications means that the filters are now not tied up with each other

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green)) {
    console.log(` * ${p.name} is green`);
}

// Better filters using specifications
class BetterFilter {
    filter(items: Product[], spec: Specification) {
        return items.filter((x) => spec.isSatisfied(x));
    }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
    console.log(` * ${p.name} is green`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
);

for (let p of bf.filter(products, spec)) {
    console.log(` * ${p.name} is large and green`);
}
