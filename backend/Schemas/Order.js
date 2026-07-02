const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
  total: Number,
  status: {
    type: String,
    default: "Pending",
  },
  
});

module.exports = mongoose.model("Order", OrderSchema);