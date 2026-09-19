const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");


router.delete("/", verifyToken, async (req, res) => {
  
  try {
    const result = await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(200).json({
      message: "Cart cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.log("CLEAR CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
