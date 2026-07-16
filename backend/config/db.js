const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("MongoDB Connected Successfully");
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(" Connection Error:", err.message);
  }
};

module.exports = connectDB;