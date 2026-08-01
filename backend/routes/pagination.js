const express = require("express");
const router = express.Router();
const Product = require("../Schemas/Product");

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      message: "success",
      products,
      totalProducts,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});

module.exports = router;