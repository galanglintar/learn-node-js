// Some core modules on Noje.js
// http, https, fs, path, os
const http = require('http');

/**
 * @param {http.IncomingMessage} request
 * * @param {http.ServerResponse} response
 */
const requestListener = (request, response) => {
    const url = request.url;
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>First Page</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    }
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>First Page</title></head>');
    response.write('<body><h1>Hello from my Node.js server!</h1></body>');
    response.write('</html>');
    response.end();
}

const server = http.createServer(requestListener);

server.listen(3000);