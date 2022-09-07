const Product = require("../Model/product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find products", error: e });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("owner");
    res.send(product);
  } catch (e) {
    res.status(404).json({ message: "Coudn't find products", error: e });
  }
};

module.exports.newProduct = async (req, res) => {
  try {
    const product = req.body;
    let newProduct = new Product(product);
    newProduct.owner = req.user;
    newProduct.images = req.files.map(f => ({ url: f.path, filename: f.filename}))
    newProduct = await newProduct.save();
    res.send(newProduct);
  } catch (e) {
    res.status(404).json({ message: "Coudn't create the product", error: e });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
    res.send(updatedProduct);
  } catch (e) {
    res.status(404).json({ message: "Coudn't update the product", error: e });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
    res.send(deletedProduct);
  } catch (e) {
    res.status(404).json({ message: "Coudn't delete the product", error: e });
  }
};

module.exports.filterProduct = async (req, res) => {
  const { category, productName } = req.query;
  const filteredProducts = await Product.find({
    $and:[
      {"name": { "$regex": productName, "$options": "i"}},
      {"category": { "$regex": category, "$options": "i"}}
    ]
  })
  res.send(filteredProducts)
};
