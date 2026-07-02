const express = require("express");
const router = express.Router();

const Product = require("../Schemas/Product");
const ProductData = require("../Schemas/ProsuctData");

router.get("/", async (req, res) => {
  try {
    const minPrice = Number(req.query.min || 0);
    const maxPrice = Number(req.query.max || 999999);
console.log(req.query);
    const products = await Product.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });

    const productData = await ProductData.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });

    const data = [...products, ...productData];
  
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;