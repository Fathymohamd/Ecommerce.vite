require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const productsRoutes = require("./routes/productsRoutes");
 const DataRoutesId = require("./routes/DataRoutesId");
const usersRoutes = require("./routes/usersRoutes");
const useRoutesId = require("./routes/useRoutesId");
const SinUpRoutes = require("./routes/SingUpRouters");
const LoginRoutes = require("./routes/LogonRoutes");
const searchRoutes = require("./routes/search");
const category = require("./routes/category");
const searchPrice = require("./routes/fetchByPrice")
const productsmongodb = require("./routes/productsmongodb")
const orderRoutes = require("./routes/OrderRouter");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/products", productsRoutes);
app.use("/api/products", searchRoutes);
app.use("/api/products/price", searchPrice);
app.use("/api/products", category);
app.use("/api/products", DataRoutesId)
app.use("/save" , productsmongodb)
app.use("/api/users", usersRoutes);
app.use("/api/users", useRoutesId);
app.use("/api", orderRoutes);

app.use("/", SinUpRoutes);
app.use("/", LoginRoutes);


app.get("/", async (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});