const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/errors");
// sequelizes
/*
const User = require('./models/user');
const sequelize = requi`re("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/sequelize/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
*/

// MongoDB
// const mongoConnect = require("./util/database");

const User = require("./models/user");

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

// sequelizes
/*
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("getUserError:", err));
});
*/

/*
app.use((req, res, next) => {
  User.findById("628ae7a5419d06f23392185e")
    .then((user) => {
      console.log(user);
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});
*/

app.use((req, res, next) => {
  User.findById("628b043a66380d08755312c3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

// sequelizes
/*
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
*/

// MongoDB
/*
mongoConnect(() => {
  app.listen(3000);
});
*/

mongoose
  .connect(
    "mongodb+srv://galang:galang-cluster-0@clusternode0.gqomc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Galang",
          email: "galang@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
