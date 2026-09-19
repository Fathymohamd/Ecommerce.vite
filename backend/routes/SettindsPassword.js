const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Login");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.patch("/", verifyToken, async (req, res) => {
  try {
    const {
      password,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!password?.trim()) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }

    if (!newPassword?.trim()) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    if (!confirmPassword?.trim()) {
      return res.status(400).json({
        message: "Confirm password is required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPassword.test(newPassword)) {
      return res.status(400).json({
        message: "Password is too weak",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

   
    const hashedPassword = await bcrypt.hash(newPassword, 10);


    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;