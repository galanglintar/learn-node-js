const path = require("path");

const express = require("express");

const adminController = require("../controllers/admins");

const router = express.Router();

// add product form route
router.get("/add-product", adminController.getAddProduct);

// product list route
router.get("/products", adminController.getProducts);

// add new product
router.post("/add-product", adminController.postAddProduct);

module.exports = { router };
