

require("dotenv").config();

const express = require("express");
const router = express.Router();
const order = require("../Schemas/Order");

const axios = require("axios");
const User = require("../models/Login");
const verifyToken = require("../middleware/verifyToken");

const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const IFRAME_KEY = process.env.IFRAME_KEY;

router.post("/", verifyToken, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    products,
    address,
    paymentMethod,
    finalPrice
  } = req.body;

  try {


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }

   

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !country ||
      !city ||
      !address ||
      !finalPrice ||
      !paymentMethod ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ================= FIND USER =================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ================= ORDER PRODUCTS =================

    const orderProducts = products.map((item) => ({
      id: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images?.[0] || item.product.image
    }));

console.log("🔥 STEP 1 - Creating MongoDB order");

    const newOrder = await order.create({
      user: user.id,
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      address,
      products: orderProducts,
      paymentMethod,
      finalPrice,
      paymentStatus: "Pending",
      status: "Pending"
    });

console.log("🔥 STEP 2 - MongoDB order created");
console.log("Mongo Order ID:", newOrder._id);

// ================= PAYMOB =================

console.log("🔥 STEP 3 - Before Paymob request");

console.log("PAYMOB_API_URL:", PAYMOB_API_URL);
console.log("SECRET_KEY exists:", !!SECRET_KEY);
console.log("IFRAME_KEY:", IFRAME_KEY);
    const orderData = await axios.post(
      PAYMOB_API_URL,
      {
        amount: Math.round(finalPrice * 100),
        currency: "EGP",
        payment_methods: [Number(IFRAME_KEY)],

        billing_data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phone,
          country: country,
          city: city,
          address: address
        }
      },
      {
        headers: {
          Authorization: `Token ${SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );


console.log("========== PAYMOB RESPONSE ==========");
console.log({
  id: orderData.data.id,
  client_secret: !!orderData.data.client_secret,
  amount: orderData.data.amount,
  currency: orderData.data.currency,
});
console.log("====================================");
    newOrder.paymobOrderId = orderData.data.id;

    await newOrder.save();

    return res.status(200).json({
      message: "Order placed successfully",
      orderId: newOrder.id,
      paymobOrderId: orderData.data.id,
      client_secret: orderData.data.client_secret
    });

} catch (error) {

  console.error("🔥🔥🔥 PAYMOB ERROR 🔥🔥🔥");

  console.error("MESSAGE:", error.message);

  console.error(
    "RESPONSE:",
    error.response?.data
  );

  console.error(
    "STATUS:",
    error.response?.status
  );

  console.error(
    "URL:",
    error.config?.url
  );

  console.error("🔥🔥🔥 END ERROR 🔥🔥🔥");

  return res.status(500).json({
    message:
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Payment error"
  });
}
});

module.exports = router;