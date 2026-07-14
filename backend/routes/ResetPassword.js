const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Login");
router.post("/:token" , async(req , res) =>{
  const token = req.params.token
  const {password} = req.body;

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
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
      });
    }
    const hashedPassword =  await bcrypt.hash(password , 10)
  user.password = hashedPassword
  await user.save();
    res.json(user)
    return res.status(200).json({
  message: "Password has been reset successfully.",
});
    }catch(error) {
        console.log(error)
    }

})

module.exports = router