const path = require("path");

const express = require("express");

const shopController = require("../controllers/shops");

const router = express.Router();

// home page route
router.get("/", shopController.getIndex);

// product list route
router.get("/products", shopController.getProducts);

// product detail page
router.get("/products/:productId", shopController.getProduct);

// cart route
router.get("/cart", shopController.getCart);

// add to cart request
router.post("/cart", shopController.postCart);

// delete cart
router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// create order
router.post("/create-order", shopController.postOrder);

// orders route
router.get("/orders", shopController.getOrders);

module.exports = router;
