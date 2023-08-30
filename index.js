// Object properties, besides a value, have three special attributes (so-called “flags”):

// writable – if true, the value can be changed, otherwise it’s read-only.
// enumerable – if true, then listed in loops, otherwise not listed.
// configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.

let user = {
    name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
// method Object.getOwnPropertyDescriptor
// returned value is a so-called “property descriptor” object:
// it contains the value and all the flags.
console.log(descriptor)
// Object { value: "John", writable: true, enumerable: true, configurable: true }

// To change the flags, we can use Object.defineProperty.

// Object.defineProperty(obj, propertyName, descriptor)


// obj, propertyName
//     The object and its property to apply the descriptor.
// descriptor
//     Property descriptor object to apply. 


// If the property exists, defineProperty updates its flags. Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed false.

let user2 = {}
let descriptor2 = Object.defineProperty(user2, "name",{
    value: "Sakib Khan"
})

console.log(user2)
console.log(Object.getOwnPropertyDescriptor(user2, "name"))

// In Strict Mode It will Give us and Error
// But it still not working in non-strict mode
Object.defineProperty(user, "name",{
    writable: false
})

user.name = "Sallu Khan";
console.log(user)


let user3 = {};

Object.defineProperty(user3, "name",{
    value: "Mushfiq",
    enumerable: true,
    configurable: true
})
// Same Above Code
user3.name = "Sakib";
console.log(user3)