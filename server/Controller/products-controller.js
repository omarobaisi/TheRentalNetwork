const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../Middleware/authorization")
const { getProducts, getProduct, newProduct, updateProduct, deleteProduct } = require("../Services/product-services")

router.get("/", getProducts)

router.get("/:id", getProduct)

router.post("/", isLoggedIn, newProduct)

router.put("/:id", isLoggedIn, updateProduct)

router.delete("/:id", isLoggedIn, deleteProduct)

module.exports = router;