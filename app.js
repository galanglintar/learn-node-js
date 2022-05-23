const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/errors");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("getUserError:", err));
});

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync({})
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Galang", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    // Create server in port 3000 using express as a handler
    app.listen(3000);
  })
  .catch((err) => {
    console.log("sequelizeError:", err);
  });
