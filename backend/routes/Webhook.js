const express = require("express");
const router = express.Router();

const Order = require("../Schemas/Order");
const PaymentSession = require("../models/PaymentSession");

router.post("/", async (req, res) => {
  try {
    console.log(
      "================ PAYMOB WEBHOOK ================"
    );

    console.log(
      "PAYMOB CALLBACK:",
      JSON.stringify(req.body, null, 2)
    );

    const transaction = req.body?.obj;

    if (!transaction) {
      return res.status(400).json({
        message: "Invalid Paymob callback",
      });
    }

    // =========================
    // PAYMENT DATA
    // =========================

    const success = transaction.success;

    const paymobOrderId =
      transaction.order?.id;

    const transactionId =
      transaction.id;

    const amountCents =
      transaction.amount_cents;
;

 

    const paymentSession =
      await PaymentSession.findOne({
        paymobOrderId: Number(
          paymobOrderId
        ),
      });

    if (!paymentSession) {
      console.log(
        "PAYMENT SESSION NOT FOUND"
      );

      return res.status(404).json({
        message:
          "Payment session not found",
      });
    }



    if (!success) {
      paymentSession.status = "Failed";

      await paymentSession.save();

      console.log(
        "PAYMENT FAILED - NO ORDER CREATED"
      );

      return res.status(200).json({
        message:
          "Payment failed",
      });
    }


    if (paymentSession.status === "Paid") {
      console.log(
        "ORDER ALREADY PROCESSED"
      );

      return res.status(200).json({
        message:
          "Payment already processed",
      });
    }

  

    const expectedAmount =
      Math.round(
        Number(
          paymentSession.finalPrice
        ) * 100
      );

    if (
      Number(amountCents) !==
      expectedAmount
    ) {
      console.log(
        "AMOUNT MISMATCH"
      );

      return res.status(400).json({
        message:
          "Payment amount mismatch",
      });
    }

    // =========================
    // CREATE REAL ORDER
    // =========================

    const newOrder =
      await Order.create({
        user: paymentSession.user,

        firstName:
          paymentSession.firstName,

        lastName:
          paymentSession.lastName,

        email:
          paymentSession.email,

        phone:
          paymentSession.phone,

        country:
          paymentSession.country,

        city:
          paymentSession.city,

        address:
          paymentSession.address,

        products:
          paymentSession.products,

        paymentMethod:
          paymentSession.paymentMethod,

        finalPrice:
          paymentSession.finalPrice,

        paymentStatus:
          "Paid",

        status:
          "Pending",

        paymobTransactionId:
          transactionId,

        paymobOrderId:
          paymobOrderId,
      });




    paymentSession.status = "Paid";

    await paymentSession.save();

    console.log(
      "PAYMENT SESSION UPDATED TO PAID"
    );

    return res.status(200).json({
      message:
        "Payment processed successfully",
    });
  } catch (error) {
    console.error(
      "PAYMOB WEBHOOK ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Webhook processing failed",
    });
  }
});

module.exports = router;