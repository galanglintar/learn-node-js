const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Routes module
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Express middleware
// Note: express run in order
// use next method to continue the next middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Create server in port 3000 using express as a handler
app.listen(3000);
