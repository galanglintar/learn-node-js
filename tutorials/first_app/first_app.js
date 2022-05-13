// Import fs module
const fs = require("fs");

const text = "Hello from Node.js";
console.log(text);

// create hello.txt file
fs.writeFileSync("hello.txt", text);
