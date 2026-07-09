require("dotenv").config();
const express = require("express");
const router = express.Router();
const order = require("../Schemas/Order");
const axios = require('axios');


const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const INTEGRATION_ID = process.env.IFRAME_KEY;

router.post("/order" , async (req , res) => {
  const {  firstName, lastName , email, phone, country, city , products , address ,
 paymentMethod,
  finalPrice,
  status } = req.body;

try {
    if( firstName === "" ||  lastName === ""  ||  email === "" ||  phone === "" || country === "" || city === "" || address === "" || finalPrice === "" || paymentMethod === "" ||   products.length === 0 ) {
   return res.status(400).json({message: "All fields are required"})
 }
const newOrder = order.create({
  firstName, 
  lastName , 
  email, 
  phone,
  country, 
  city,
  address,
  products, 
 paymentMethod,
   finalPrice,
  status
})
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
// gitignore
    
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