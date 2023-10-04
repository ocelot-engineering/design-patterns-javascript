/**
 * This example of the prototype patterns shows how different field types can be cloned.
 */

class Prototype {
    public primitive!: any;
    public component!: object;
    public circularReference!: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        // Cloning an object that has a nested object with back reference
        // requires special treatment. After the cloning is completed, the
        // nested object should point to the cloned object, instead of the
        // original object.
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype: any;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 123;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log(
            'OK: Primitive field values have been carried over to a clone.'
        );
    } else {
        console.log('FAIL: Primitive field values have not been copied.');
    }
    if (p1.component === p2.component) {
        console.log('FAIL: Simple component has not been cloned.');
    } else {
        console.log('OK: Simple component has been cloned.');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('FAIL: Component with back reference has not been cloned.');
    } else {
        console.log('OK: Component with back reference has been cloned.');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log(
            'FAIL: Component with back reference is linked to original object.'
        );
    } else {
        console.log(
            'OK: Component with back reference is linked to the clone.'
        );
    }
}

clientCode();
