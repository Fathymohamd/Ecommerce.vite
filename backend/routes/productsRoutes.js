const express = require("express");
const router = express.Router();

const Product = require("../Schemas/Product");
const getProducts = require("../controllers/ProductFind");


router.get("/", getProducts);

module.exports = router;