
const express = require("express");
const multer = require("multer");
const User = require("../models/Login");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
const user = await User.findById(req.user.id); 
if (!user) 
{ return res.status(404).json({ message: "User not found" }); }

 user.profileImage = `/uploads/${req.file.filename}`;

 await user.save(); 

 res.json({ message: "Image uploaded successfully", image: user.profileImage });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;
