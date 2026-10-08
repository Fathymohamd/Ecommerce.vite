const express = require("express");
const router = express.Router();
const Product = require("../../Schemas/Product");
const verifyToken = require("../../middleware/verifyToken");

router.patch("/:id",  async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct =
      await Product.findOneAndUpdate(
        { id: Number(id) },
        {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          images: req.body.images,
        },
        { new: true }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;