const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: Number,
  count: Number,
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: Number,

  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  rating: ratingSchema,
});

module.exports = mongoose.model("products", productSchema);