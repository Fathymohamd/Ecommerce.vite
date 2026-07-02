const express = require("express");
const router = express.Router();
const Product = require("../Schemas/Product");
const ProductData = require("../Schemas/ProsuctData");

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    const products1 = await Product.find({
      title: { $regex: q, $options: "i" }
    });

    const products2 = await ProductData.find({
      title: { $regex: q, $options: "i" }
    });

    const products = [...products1, ...products2];

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;