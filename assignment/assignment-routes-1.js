/**
 * @param {http.IncomingMessage} request
 * * @param {http.ServerResponse} response
 */
 const requestListener = (request, response) => {
    const url = request.url;
    const method = request.method;
    if (url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>Assignment 1</title></head>');
        response.write('<body>Hello world!</body>');
        response.write('</html>');
        return response.end();
    }
    if (url === '/users') {
        const users = ['Galang', 'Andy'];
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>Assignment 1</title></head><body><ul>');
        for (const a in users) {
            response.write(`<li>${users[a]}</li>`);
        }
        response.write('</ul>');
        response.write('<form action="/create-user" method="POST"><input type="text" name="createuser"></input><button type="submit">Create User</button></form></body></html>');
        return response.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
            response.statusCode = 302;
            response.setHeader('Location', '/');
            return response.end();
        });
    }
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>404 Not Found</title></head>');
    response.write('<body><h1>Url Not Found!</h1></body>');
    response.write('</html>');
    response.end();
}

module.exports = {
    requestListener
}