const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.log("GET CART ERROR:", error);

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

    const exists = await Cart.findOne({
      user: req.user.id,
      product: productId,
      productModel,
    });

    if (exists) {
      return res.status(400).json({
        message: "Product already in cart",
      });
    }

    const newCart = await Cart.create({
      user: req.user.id,
      product: productId,
      productModel,
    });

    const cart = await Cart.findById(newCart._id)
      .populate("product");

    res.status(201).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    console.log("ADD CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;