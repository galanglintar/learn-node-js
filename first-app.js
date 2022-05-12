const text = 'Hello from Node.js';
console.log(text);

const fs = require('fs');

fs.writeFileSync('hello.txt', text);