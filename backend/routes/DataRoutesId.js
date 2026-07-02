const express = require("express");
const router = express.Router();
const Product = require("../Schemas/Product");

router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findOne({ id: Number(req.params.id) });

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;