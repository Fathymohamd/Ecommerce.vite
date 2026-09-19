const express = require("express");
const User = require("../models/Login");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.patch("/", verifyToken, async (req, res) => {
  try {
    const { darkMode } = req.body;

    if (typeof darkMode !== "boolean") {
      return res.status(400).json({
        message: "darkMode must be true or false",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.darkMode = darkMode;

    await user.save();

    res.status(200).json({
      message: "Dark mode updated successfully",
      user: {
        id: user._id,
        darkMode: user.darkMode,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        darkMode: user.darkMode,
      },
    });

  } catch (error) {

       console.log("DARK MODE GET ERROR:", error);


    res.status(500).json({
      message: "Server error",
    });

  }
});



module.exports = router;