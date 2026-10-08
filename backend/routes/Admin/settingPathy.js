const express = require("express");
const Settings = require("../../Schemas/storeName");

const router = express.Router();

router.patch("/", async (req, res) => {
  try {
    const { setting, currency } = req.body;

    if (!setting || !currency) {
      return res.status(400).json({
        message: "Setting and currency are required",
      });
    }
const settings = await Settings.create({
  setting : setting,
  currency : currency
})


    res.json({
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;