const { Sequelize } = require("sequelize");

// sequelize setup using MySQl database
const sequelize = new Sequelize("shop-app", "root", "", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: false,
});

module.exports = sequelize;
