const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    address: String,

    products: Array,

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

    paymobTransactionId: {
      type: String,
      default: null,
    },

    paymobOrderId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
;

module.exports =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);