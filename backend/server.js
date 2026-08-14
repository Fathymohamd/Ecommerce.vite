require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const productsRoutes = require("./routes/productsRoutes");
const DataRoutesId = require("./routes/DataRoutesId");
const usersRoutes = require("./routes/usersRoutes");
const useRoutesId = require("./routes/useRoutesId");
const SinUpRoutes = require("./routes/SingUpRouters");
const LoginRoutes = require("./routes/LogonRoutes");
const searchRoutes = require("./routes/search");
const category = require("./routes/category");
const searchPrice = require("./routes/fetchByPrice");
const productsmongodb = require("./routes/productsmongodb");
const orderRoutes = require("./routes/OrderRouter");
const orderProducts = require("./routes/orderProducts");
const Logout = require("./routes/Logout");
const forgotPassword = require("./routes/ForgotPassword");
const resetPassword = require("./routes/ResetPassword");
const pagination = require("./routes/pagination");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();


// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-vite-cspo.vercel.app",
      "https://ecommerce-vite-v4p9.vercel.app",
    ],
    credentials: true,
  })
);


// ===============================
// Middleware
// ===============================

app.use(cookieParser());

app.use(express.json());


// ===============================
// Database
// ===============================

connectDB();


// ===============================
// Products Routes
// ===============================

app.use("/api/products", productsRoutes);

app.use("/api/products", searchRoutes);

app.use("/api/products/price", searchPrice);

app.use("/api/products", category);

app.use("/api/products", DataRoutesId);

app.use("/save", productsmongodb);


// ===============================
// Users Routes
// ===============================

app.use("/api/users", usersRoutes);

app.use("/api/users", useRoutesId);


// ===============================
// Orders Routes
// ===============================

app.use("/api", orderRoutes);

app.use("/api/orders", orderProducts);


// ===============================
// Authentication Routes
// ===============================

app.use("/api/Logout", Logout);

app.use("/api/users/ForgotPassword", forgotPassword);

app.use("/api/reset-password", resetPassword);


// ===============================
// Pagination
// ===============================

app.use("/api/product", pagination);


// ===============================
// Signup / Login
// ===============================

app.use("/", SinUpRoutes);

app.use("/", LoginRoutes);


// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.send("Backend is running");
});


// ===============================
// Export App
// ===============================

module.exports = app;


// ===============================
// Local Development Server
// ===============================

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}