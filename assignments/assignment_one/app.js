const http = require("http");
const routes = require("./routes");

// Create server on port 3000 and listen to it
const server = http.createServer(routes.requestListener);
server.listen(3000);
