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

// edit product
router.get("/edit-product/:productId", adminController.getEditProduct);

// save edited product
router.post("/edit-product", adminController.postEditProduct);

// delete product
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = { router };
