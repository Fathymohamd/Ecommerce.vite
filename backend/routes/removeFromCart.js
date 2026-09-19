const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const cartId = req.params.id;

    await Cart.findOneAndDelete({
      _id: cartId,
      user: req.user.id,
    });

    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.log("DELETE CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;