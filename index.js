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


let user4 = {
    name: "John",
    toString() {
      return this.name;
    }
  };
  
  // By default, both our properties are listed:
  for (let key in user4) console.log(key); // name, toString

Object.defineProperty(user4, "toString", {
    enumerable: false,
})

for (let key in user4) console.log(key); // name
// now will show just name

// Non-enumerable properties are also excluded from Object.keys:

console.log(Object.keys(user4)); // name


// Non-configurable

// The non-configurable flag (configurable:false) is sometimes preset for built-in objects and properties.

// A non-configurable property can’t be deleted, its attributes can’t be modified.

// For instance, Math.PI is non-writable, non-enumerable and non-configurable:

console.log(Object.getOwnPropertyDescriptor(Math, 'PI'))
Math.PI = 3; // Error, because it has writable: false

// delete Math.PI won't work either

// Error, because of configurable: false
Object.defineProperty(Math, "PI", { configurable: true, writable: true });
Math.PI = 3; 
// console.log(Math.PI)

// There’s absolutely nothing we can do with Math.PI.

// Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.

// Please note: configurable: false prevents changes of property flags and its deletion, while allowing to change its value.

// Here user.name is non-configurable, but we can still change it (as it’s writable):