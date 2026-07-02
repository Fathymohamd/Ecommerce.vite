const express = require("express");
const router = express.Router();
const order = require("../Schemas/Order");

router.post("/order" , async (req , res) => {
   res.json("Hello");
})

module.exports = router;