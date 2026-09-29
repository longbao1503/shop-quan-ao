const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose
  .connect("mongodb://localhost:27017/web-ban-quan-ao")
  .then(() => {
    console.log("Ket noi MongoDB thanh cong");
  })
  .catch((error) => {
    console.log("Loi ket noi MongoDB:", error);
  });

const importUsers = async () => {
  try {
    await User.deleteMany();

    const adminPassword = await bcrypt.hash("123456", 10);
    const customerPassword = await bcrypt.hash("123456", 10);

    await User.insertMany([
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Khách hàng",
        email: "customer@gmail.com",
        password: customerPassword,
        role: "customer",
      },
    ]);

    console.log("Them tai khoan mau thanh cong");
    process.exit();
  } catch (error) {
    console.log("Loi them tai khoan:", error);
    process.exit(1);
  }
};

importUsers();