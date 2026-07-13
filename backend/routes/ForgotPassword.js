const express = require("express");
require("dotenv").config();
const router = express.Router();
const User = require("../models/Login");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
const token = jwt.sign(
  {id : user._id},
   process.env.JWT_SECRET,
   {expiresIn : "7d"}
)
const resetLink = `http://localhost:5173/reset-password/${token}`;



     const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }); 

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `This is a test email from your Ecommerce project: ${resetLink}`,
    });

    return res.status(200).json({
      message: "Email sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;