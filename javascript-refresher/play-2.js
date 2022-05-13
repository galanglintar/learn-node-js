// object
const person = {
    name: 'Galang',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
}

person.greet();

// array
const hobbies = ['Sports', 'Cooking'];
// Note: in js there are some usefull method to playing arround with,
// use dot [.] to start using one of them

// use spread [...] to pull an array
// also can user rest [...] to merge multiple array
const copiedArray = [...hobbies];

// Destructuring object use {}, and array use []
const {name, age} = person;
const [h1, h2] = hobbies;