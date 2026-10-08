const express = require("express");
const router = express.Router();

const Order = require("../Schemas/Order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {


    res.status(500).json({
      message: error.message,
    });
  }
});


router.get("/:id" , async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id);

    res.json(orders);
  } catch (error) {


    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;