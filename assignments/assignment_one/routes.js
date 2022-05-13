const requestListener = (request, response) => {
  const url = request.url;
  const method = request.method;

  // Home page route
  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Assignment 1 - Home</title></head>");
    response.write("<body>Hello world!</body>");
    response.write("</html>");
    return response.end();
  }
  // Users route
  if (url === "/users") {
    const users = ["Galang", "Andy"];
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Assignment 1 - Users</title></head>");
    response.write("<body><ul>");
    for (const a in users) {
      response.write(`<li>${users[a]}</li>`);
    }
    response.write("</ul>");
    response.write('<form action="/create-user" method="POST">');
    response.write('<input type="text" name="createuser"></input>');
    response.write('<button type="submit">Create User</button>');
    response.write("</form></body></html>");
    return response.end();
  }
  // Create user route
  if (url === "/create-user" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
      response.statusCode = 302;
      response.setHeader("Location", "/");
      return response.end();
    });
  }
  // Not found route
  response.statusCode = 404;
  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<head><title>404 Not Found</title></head>");
  response.write("<body><h1>Url Not Found!</h1></body>");
  response.write("</html>");
  response.end();
};

module.exports = {
  requestListener,
};
