
const express = require("express");
const Product = require("../Schemas/Product");
const ProductFind = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      message: "success",
      products
    });

  } catch (error) {
  console.error("PRODUCT ERROR:", error);

  res.status(500).json({
    message: error.message
  });
}
};

module.exports = ProductFind;