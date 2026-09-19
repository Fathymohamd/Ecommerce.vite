const express = require("express");
const router = express.Router();

const Wishlist = require("../models/Wishlist");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      wishlist,
    });

  } catch (error) {
    console.log("GET WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, productModel } = req.body;

    if (!productId || !productModel) {
      return res.status(400).json({
        message: "Product ID and product model are required",
      });
    }

    const exists = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
      productModel,
    });

    if (exists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user.id,
      product: productId,
      productModel,
    });

    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.status(201).json({
      message: "Product added to wishlist",
      wishlist,
    });

  } catch (error) {
    console.log("POST WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;