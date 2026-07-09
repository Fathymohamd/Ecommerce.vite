const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    address: String,

    products: [
      {
        id: Number,
        title: String,
        price: Number,
        quantity: Number,
      },
    ],

    paymentMethod: String,
    finalPrice: Number,

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    status: {
      type: String,
      default: "Pending",
    },

    transactionId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);