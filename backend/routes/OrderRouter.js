require("dotenv").config();

const express = require("express");

const router = express.Router();

const axios = require("axios");

const PaymentSession =
  require("../models/PaymentSession");

const User =
  require("../models/Login");

const verifyToken =
  require("../middleware/verifyToken");

const PAYMOB_API_URL =
  process.env.PAYMOB_API_URL;

const SECRET_KEY =
  process.env.SECRET_KEY;

const CARD_INTEGRATION_ID =
  process.env.CARD_INTEGRATION_ID;


// =====================================================
// CREATE PAYMENT SESSION
// =====================================================

router.post(
  "/order",
  verifyToken,
  async (req, res) => {

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
      finalPrice,
    } = req.body;

    try {

      // =========================
      // VALIDATION
      // =========================

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message:
            "Please enter a valid email address",
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
        finalPrice == null ||
        !paymentMethod ||
        !products ||
        products.length === 0
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      // =========================
      // FIND USER
      // =========================

      const user =
        await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      // =========================
      // CHECK PAYMOB CONFIG
      // =========================

      if (!SECRET_KEY) {
        return res.status(500).json({
          message:
            "Paymob SECRET_KEY is missing",
        });
      }

      if (!CARD_INTEGRATION_ID) {
        return res.status(500).json({
          message:
            "CARD_INTEGRATION_ID is missing",
        });
      }

      if (!PAYMOB_API_URL) {
        return res.status(500).json({
          message:
            "PAYMOB_API_URL is missing",
        });
      }

 

      const orderProducts =
        products.map((item) => ({
          id: item.product._id,

          title:
            item.product.title,

          price:
            item.product.price,

          quantity:
            item.quantity,

          image:
            item.product.images?.[0] ||
            item.product.image ||
            "",
        }));

  

      const orderData =
        await axios.post(
          PAYMOB_API_URL,
          {
            amount:
              Math.round(
                Number(finalPrice) * 100
              ),

            currency:
              "EGP",

            payment_methods: [
              Number(
                CARD_INTEGRATION_ID
              ),
            ],

            items:
              orderProducts.map(
                (item) => ({
                  name:
                    item.title,

                  amount:
                    Math.round(
                      Number(
                        item.price
                      ) * 100
                    ),

                  description:
                    item.title,

                  quantity:
                    item.quantity,
                })
              ),

            billing_data: {
              apartment:
                "NA",

              floor:
                "NA",

              street:
                address,

              building:
                "NA",

              first_name:
                firstName,

              last_name:
                lastName,

              phone_number:
                phone,

              city:
                city,

              country:
                country,

              email:
                email,

              state:
                city,
            },

            special_reference:
              `USER_${user._id}_${Date.now()}`,

      

            notification_url:
              "https://ecommerce-vite-two.vercel.app/api/paymob/webhook",
          },

          {
            headers: {
              Authorization:
                `Token ${SECRET_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      // =========================
      // PAYMOB DATA
      // =========================

      const paymobOrderId =
        orderData.data
          .intention_order_id;

      const intentionId =
        orderData.data.id;

      const clientSecret =
        orderData.data
          .client_secret;

      console.log(
        "PAYMOB ORDER ID:",
        paymobOrderId
      );

      console.log(
        "PAYMOB INTENTION ID:",
        intentionId
      );



      const paymentSession =
        await PaymentSession.create({
          user:
            user._id,

          firstName:
            firstName,

          lastName:
            lastName,

          email:
            email,

          phone:
            phone,

          country:
            country,

          city:
            city,

          address:
            address,

          products:
            orderProducts,

          paymentMethod:
            paymentMethod,

          finalPrice:
            finalPrice,

          paymobOrderId:
            paymobOrderId,

          intentionId:
            intentionId,

          status:
            "Pending",
        });



      return res.status(200).json({
        message:
          "Payment session created",

        paymentSessionId:
          paymentSession._id,

        paymobOrderId:
          paymobOrderId,

        intentionId:
          intentionId,

        client_secret:
          clientSecret,
      });

    } catch (error) {

      console.error(
        "PAYMOB ERROR:",
        error.response?.data ||
        error.message
      );

      return res.status(500).json({
        message:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Payment error",
      });
    }
  }
);

module.exports = router;