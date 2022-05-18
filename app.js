const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/errors");

const app = express();

// pug templating engines
/*
app.set("view engine", "pug");
app.set("views", "views/pug");
*/

// handlebars templating engines (old ways)
/*
const expressHbs = require("express-handlebars");
app.engine(
  "hbs",
  expressHbs({
    layoutDir: "views/hbs/layouts/",
    defaultLayout: "main-layout.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views/hbs");
*/

// ejs templating engines
app.set("view engine", "ejs");
app.set("views", "views/ejs");

// Routes module
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Express middleware
// Note: express run in order
// use next method to continue the next middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

// Create server in port 3000 using express as a handler
app.listen(3000);
