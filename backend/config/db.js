const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.DATABASE);

    console.log("MongoDB Connected Successfully");
    console.log("MongoDB STATE:", mongoose.connection.readyState);

  } catch (error) {
    console.log("Connection Error:", error.message);
    throw error;
  }
};

module.exports = connectDB;