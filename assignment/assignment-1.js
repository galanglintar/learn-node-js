const http = require('http');
const routes = require('./assignment-routes-1');

const server = http.createServer(routes.requestListener);

server.listen(3000);