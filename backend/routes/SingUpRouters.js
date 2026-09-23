
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Login")

router.post("/Sinup", async (req, res) => {
  
  const { name , email, password } = req.body;

  try {
  
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
      


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Please enter a valid email address",
  });
}
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message: "Password is too weak",
      });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router