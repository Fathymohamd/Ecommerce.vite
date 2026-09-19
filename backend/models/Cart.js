const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "productModel",
      required: true
    },

    productModel: {
      type: String,
      required: true,
      enum: ["externalproducts" , "products"]
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Cart", cartSchema);