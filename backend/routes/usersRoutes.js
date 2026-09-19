const express = require("express");
const router = express.Router();
const product = require("../Schemas/ProsuctData");

router.get("/", async (req, res) => {
  try {
    const data = await product.find();
       res.json({
      message: "success",
     data
    });

  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;