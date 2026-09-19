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
        message: "Cart not found"
      });
    }

    cart.quantity += 1;

    await cart.save();

    res.json({
      message: "Quantity increased",
      cart
    });

  } catch (error) {
    console.log("INCREASE ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;