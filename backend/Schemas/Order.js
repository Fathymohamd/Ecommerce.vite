
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
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
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
