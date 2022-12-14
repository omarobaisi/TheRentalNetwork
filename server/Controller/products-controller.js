const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../Middleware/authorization");
const multer = require('multer');
const { storage }  = require('../cloudinary');
const upload = multer({ storage })
const {
  getProducts,
  getProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  filterProduct,
  returnProduct,
  latestTen
} = require("../Services/product-services");

router.get("/", getProducts);

router.get("/limit", latestTen);

router.get("/filter", filterProduct);

router.get("/return/:productId", returnProduct);

router.get("/:id", getProduct);

router.post("/", isLoggedIn, newProduct);

router.put("/:id", isLoggedIn, updateProduct);

router.delete("/:id", isLoggedIn, deleteProduct);

module.exports = router;
