const express = require("express");
const Settings = require("../../Schemas/storeName");


const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.status(200).json({settings});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;