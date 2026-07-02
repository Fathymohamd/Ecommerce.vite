const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../Schemas/Product");

router.get("/", async (req, res) => {
    console.log("Route Started");
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=200"
    );

await Product.insertMany(response.data.products);

    res.json({ message: "Saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;