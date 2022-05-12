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