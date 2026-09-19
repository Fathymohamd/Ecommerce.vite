const express = require("express");
const User = require("../models/Login");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.patch("/", verifyToken, async (req, res) => {
  try {
    const { checkbox } = req.body;

    if (typeof checkbox !== "boolean") {
      return res.status(400).json({
        message: "Notifications must be true or false",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.notifications = checkbox;

    await user.save();

    res.status(200).json({
      message: "Notification settings updated successfully",
      user: {
        id: user._id,
        notifications: user.notifications,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;