const express = require("express");
const router = express.Router();

const Order = require("../Schemas/Order");

console.log("ORDER:", Order);
console.log("ORDER FIND:", typeof Order.find);

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;