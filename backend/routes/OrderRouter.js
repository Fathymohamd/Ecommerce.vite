require("dotenv").config();
const express = require("express");
const router = express.Router();
const order = require("../Schemas/Order");
const axios = require('axios');
const User = require("../models/Login")
const verifyToken = require("./../middleware/verifyToken");

const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const INTEGRATION_ID = process.env.IFRAME_KEY;

router.post("/order" , verifyToken , async (req , res) => {

  const {  firstName, lastName , email, phone, country, city , products , address ,
 paymentMethod,
  finalPrice,
  status } = req.body;

try {
    if( firstName === "" ||  lastName === ""  ||  email === "" ||  phone === "" || country === "" || city === "" || address === "" || finalPrice === "" || paymentMethod === "" ||   products.length === 0 ) {
   return res.status(400).json({message: "All fields are required"})
 }

const user = await User.findById(req.user.id);

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

const orderProducts = products.map((item) => ({
  id: item.id,
  title: item.title,
  price: item.price,
  quantity: item.quantity,
  image: item.images?.[0] || item.image,
}));

const newOrder = await order.create({
  user: user.id,
  firstName,
  lastName,
  email,
  phone,
  country,
  city,
  address,
  products : orderProducts,
  paymentMethod,
  finalPrice,
  paymentStatus: "Pending",
  status: "Pending"
});
const savedOrder = await newOrder;


const orderData = await axios.post(
  PAYMOB_API_URL,
  {
    
   amount: Math.round(finalPrice * 100),
    currency: "EGP",
    payment_methods: [Number(INTEGRATION_ID)],
  billing_data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      country: country,
      city: city,
      address: address,
    }
  },
  {
    headers: {
      Authorization: `Token ${SECRET_KEY}`,
      "Content-Type": "application/json"
    }
  }
  
);
return res.status(200).json({
    message : "Order placed successfully",
  client_secret: orderData.data.client_secret,
});


}catch (error) {

  return res.status(500).json({
    message: error.response?.data || error.message,

  });
}

})

module.exports = router;