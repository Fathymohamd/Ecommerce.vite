const express = require("express");
const router = express.Router();

const Product = require("../../Schemas/Product");
const verifyToken = require("../../middleware/verifyToken");

router.post("/",  async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      images
    } = req.body;

    const lastProduct = await Product.findOne().sort({ id: -1 });

    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = await Product.create({
      id: newId,
      title,
      description,
      category,
      price: Number(price),
      images
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
});

module.exports = router;