const express = require("express");
const router = express.Router();
const auth = require("../models/jwtverify");

router.get("/profile", auth, (req, res) => {
  return res.status(400).json({
 message: "Welcome",
    user: req.user
  });
});

module.exports = router;