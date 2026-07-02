const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: String,
  description: String,
  category: String,
  price: Number,
  images: [String],
  rating: Number
});

module.exports = mongoose.model("externalproducts", productSchema);