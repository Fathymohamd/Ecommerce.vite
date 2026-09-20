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
const clearUserCart = require("./routes/clearUserCart");
const authRoutes = require("./routes/authRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const settings = require("./routes/settings")
const SettindsPassword = require("./routes/SettindsPassword")
const Notifications = require("./routes/Notifications")
const DarkMode = require("./routes/DarkMode")
const contactController = require("./routes/contactController")

const CartRouter = require("./routes/CartRouter")
const removeFromCart = require("./routes/removeFromCart")
const romoveWishlist = require("./routes/romoveWishlist")
const increase = require("./routes/increase")
const decrease = require("./routes/decrease")
const multer = require("./routes/multer")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


app.use(cookieParser());

app.use(express.json());



connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/profile/image", multer);
app.use("/api/products", productsRoutes);
app.use("/api/users/DarkMode", DarkMode);

app.use("/api/users/darkMode", DarkMode);
app.use("/api/products", searchRoutes);

app.use("/api/products/price", searchPrice);

app.use("/api/products", category);

app.use("/api/products", DataRoutesId);

app.use("/save", productsmongodb);

app.use("/wishlist" , wishlistRoutes)

app.use("/cart" , CartRouter)

app.use("/cart", removeFromCart);

app.use("/wishlist", romoveWishlist);

app.use("/api/users", usersRoutes);

app.use("/clearUserCart", clearUserCart);

app.use("/api/users", useRoutesId);

app.use("/api/cart/increase", increase);

app.use("/api/cart/decrease", decrease);

app.use("/api/users/profile", settings);

app.use("/api/users/password", SettindsPassword);

app.use("/api/users/Notifications", Notifications);

app.use("/api/contact", contactController);
app.use("/api", orderRoutes);

app.use("/api/orders", orderProducts);


app.use("/logout", Logout);

app.use("/api/users/ForgotPassword", forgotPassword);

app.use("/api/reset-password", resetPassword);



app.use("/api/product", pagination);

app.use("/api/auth", authRoutes);

app.use("/", SinUpRoutes);

app.use("/", LoginRoutes);




app.get("/", (req, res) => {
  res.send("Backend is running");
});



module.exports = app;


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}