const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Login");
router.post("/:token" , async(req , res) =>{
  const token = req.params.token


    try{
         if (!token) {
      return res.status(401).json({
        message: "No token",
      });
    }
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decoded.id
     const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({message: "No account found for this reset link." });
    }

    res.json(user)
    }catch(error) {
        console.log(error)
    }

})

module.exports = router