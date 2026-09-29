
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;

mongoose
  .connect("mongodb+srv://tranlongbao03_db_user:AjmRAxQ8iSAEqw1p@cluster0.u9tr3lq.mongodb.net/web-ban-quan-ao?appName=Cluster0")
  .then(() => {
    console.log("Ket noi MongoDB thanh cong");
  })
  .catch((error) => {
    console.log("Loi ket noi MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Backend website ban quan ao dang chay");
});

app.listen(PORT, () => {
  console.log(`Server dang chay tai http://localhost:${PORT}`);
  console.log(`API san pham: http://localhost:${PORT}/api/products`);
  console.log(`API don hang: http://localhost:${PORT}/api/orders`);
  console.log(`API dang nhap/dang ky: http://localhost:${PORT}/api/auth`);
});