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
// Object.defineProperty(Math, "PI", { configurable: true, writable: true });
Math.PI = 3; 
// console.log(Math.PI)

// There’s absolutely nothing we can do with Math.PI.

// Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.

// Please note: configurable: false prevents changes of property flags and its deletion, while allowing to change its value.

// Here user.name is non-configurable, but we can still change it (as it’s writable):

let user6 = {
    name: "John"
  };
  
  Object.defineProperty(user6, "name", {
    configurable: false
  });
  
  user6.name = "Pete"; // works fine
  delete user6.name; // Error
console.log(user6)


let user7 = {
    name: "John"
  };
  
  Object.defineProperty(user7, "name", {
    writable: false,
    configurable: false
  });
  
  // won't be able to change user.name or its flags
  // all this won't work:
  user7.name = "Pete";
  delete user7.name;
  Object.defineProperty(user, "name", { value: "Pete", configurable: true, writable: true });
  console.log(user7)
  console.log(Object.getOwnPropertyDescriptor(user7, "name"))


//   There’s a method Object.defineProperties(obj, descriptors) that allows to define many properties at once.
// Object.defineProperties(user, {
//     name: { value: "John", writable: false },
//     surname: { value: "Smith", writable: false },
//     // ...
//   });

// To get all property descriptors at once, we can use the method Object.getOwnPropertyDescriptors(obj).

// Together with Object.defineProperties it can be used as a “flags-aware” way of cloning an object:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user7));

// Normally when we clone an object, we use an assignment to copy properties, like this:

// for (let key in user) {
//     clone[key] = user[key]
//   }

// …But that does not copy flags. So if we want a “better” clone then Object.defineProperties is preferred.

// Another difference is that for..in ignores symbolic and non-enumerable properties, but Object.getOwnPropertyDescriptors returns all property descriptors including symbolic and non-enumerable ones.


// Sealing an object globally

// Property descriptors work at the level of individual properties.

// There are also methods that limit access to the whole object:

// Object.preventExtensions(obj)
//     Forbids the addition of new properties to the object.
// Object.seal(obj)
//     Forbids adding/removing of properties. Sets configurable: false for all existing properties.
// Object.freeze(obj)
//     Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.

// And also there are tests for them:

// Object.isExtensible(obj)
//     Returns false if adding properties is forbidden, otherwise true.
// Object.isSealed(obj)
//     Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.
// Object.isFrozen(obj)
//     Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.

// These methods are rarely used in practice.