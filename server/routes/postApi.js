const express = require("express");
const router = express.Router();
const Product = require("../model/product")
const Record = require("../model/rentRecord");

router.get("/", async (req, res) => {
    const products = await Product.find({})
    res.send(products.data);
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send(product)
})

router.post("/new", async (req, res) => {
    const { post } = req.body
    const newPost = new Product(post);
    //Todo: Add owner 
    await newPost.save();
})

router.get("/rent", async (req, res) => {
    const { product, renter } = req.body;
    const newRecord = new Record(product);
    await newRecord.save();
})

module.exports = router;