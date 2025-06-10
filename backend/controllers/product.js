const Product = require("../models/Product");
const mapProduct = require("../helpers/mapProduct");

async function addProduct(req, res) {
  try {
    const newProduct = await Product.create(req.body);
    res.send(mapProduct(newProduct));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

async function editProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(mapProduct(updatedProduct));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.send({ error: null });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

async function getProducts(req, res) {
  const products = await Product.find();
  res.send(products.map(mapProduct));
}

async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  res.send(mapProduct(product));
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
