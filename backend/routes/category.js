const express = require("express");
const router = express.Router();
const Product = require("../Schemas/Product");

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({ category });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;