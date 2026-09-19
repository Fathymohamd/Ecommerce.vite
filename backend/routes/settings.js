const express = require("express");
const User = require("../models/Login");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.patch("/", verifyToken, async (req, res) => {
  try {
    
    const { name, email} = req.body;

    if (!name?.trim() && !email?.trim()) {
      return res.status(400).json({
        message: "Email and Name is required",
      });
    }
      if (!name?.trim() ){
      return res.status(400).json({
        message: "Name is required",
      });
    }


    if (!email?.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name.trim();
    user.email = email.trim();

    await user.save();



    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;