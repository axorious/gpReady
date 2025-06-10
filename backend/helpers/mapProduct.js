const mongoose = require("mongoose");

module.exports = function (product) {
  return {
    id: product._id,
    productName: product.productName,
    image_url: product.image_url,
    price: product.price,
    category: product.category,
    quantity: product.quantity,
  };
};
