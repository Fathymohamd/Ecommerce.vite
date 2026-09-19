const express = require("express");
const router = express.Router();

const Wishlist = require("../models/Wishlist");
const verifyToken = require("../middleware/verifyToken");

router.delete("/:id", verifyToken, async (req, res) => {
      console.log("🔥 DELETE WISHLIST ROUT")
  try {
 
    const wishlistId = req.params.id;
    const userId = req.user.id;

    const deletedWishlist = await Wishlist.findOneAndDelete({
      _id: wishlistId,
      user: userId,
    });

    
    if (!deletedWishlist) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    const wishlist = await Wishlist.find({
      user: userId,
    }).populate("product");

   
    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist,
    });

  } catch (error) {
    console.log("DELETE WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;