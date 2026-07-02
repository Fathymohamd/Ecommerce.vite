
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Login")

router.post("/Sinup", async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
   
    if (!firstName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
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
      firstName,
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