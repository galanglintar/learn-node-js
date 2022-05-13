const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log('In the first middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('In the second Middleware');
//   res.send('<p>Random response</p>');
// });

app.use("/users", (req, res, next) => {
  console.log("/users route");
  res.send("<p>Users page</p>");
});

app.use("/", (req, res, next) => {
  console.log("/ home page route");
  res.send("<p>Home page</p>");
});

app.listen(3000);
