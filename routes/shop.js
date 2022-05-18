const path = require("path");

const express = require("express");

const shopController = require("../controllers/shops");

const router = express.Router();

// home page route
router.get("/", shopController.getIndex);

// product list route
router.get("/products", shopController.getProducts);

// cart route
router.get("/cart", shopController.getCart);

// orders route
router.get("/orders", shopController.getOrders);

// checkoout route
router.get("/checkout", shopController.getCheckout);

module.exports = router;
