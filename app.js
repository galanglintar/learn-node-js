// Some core modules on Noje.js
// http, https, fs, path, os
const http = require('http');
const routes = require('./routes');

console.log(routes.text);
const server = http.createServer(routes.requestListener);

server.listen(3000);