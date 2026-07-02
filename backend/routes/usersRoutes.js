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

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;