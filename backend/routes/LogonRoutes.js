require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Login");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
res.cookie("token", token, {
  httpOnly: true,   
  secure: false,    
  maxAge: 7 * 24 * 60 * 60 * 1000 
});
    return res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;