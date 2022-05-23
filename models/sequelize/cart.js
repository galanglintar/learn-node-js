const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// create cart model using sequelize format
const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
