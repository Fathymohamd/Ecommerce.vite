const express = require("express");
const router = express.Router();
const Products = require("../Schemas/ProsuctData");

router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findOne({ id: Number(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports  = router;