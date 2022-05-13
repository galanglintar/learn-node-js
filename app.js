// Some core modules on Noje.js
// http, https, fs, path, os
const http = require('http');

const requestListener = (request, response) => {
    console.log(request);
}

const server = http.createServer(requestListener);

server.listen(3000);