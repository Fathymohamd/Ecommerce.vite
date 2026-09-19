const Contact = require("../Schemas/Contact");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
router.post( "/" , verifyToken , async (req, res)  => {
  try {
    const { name, email, message } = req.body;

 
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name email and message are required",
      });
    }

  
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }

}) 


module.exports = router