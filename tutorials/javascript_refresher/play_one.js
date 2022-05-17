// var name = 'Galang';
// var age = '29';
// var hasHobbies = true;

// Note: var is outdated syntax, use let and const instead
// const used for variable that never change
const name = "Galang";
let age = "29";
const hasHobbies = true;

// Note: New way to write function (same as flutter), can use arrow (=>)
// eg: const getUser = (params) => { logic }
function getUser(name, age, hasHobbies) {
  return "Name: " + name + ", Age: " + age + ", Has Hobbies: " + hasHobbies;
}

console.log(getUser(name, age, hasHobbies));
