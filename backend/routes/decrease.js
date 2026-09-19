const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

router.patch("/:productId", verifyToken, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findById(productId);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    if (cart.quantity <= 1) {
      return res.status(400).json({
        message: "Quantity cannot be less than 1",
      });
    }

    cart.quantity -= 1;

    await cart.save();


    res.json({
      message: "Quantity decreased",
      cart,
    });

  } catch (error) {
    console.log("DECREASE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;