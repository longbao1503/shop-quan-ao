const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Tạo đơn hàng mới
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, note, items, totalPrice } = req.body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin đặt hàng",
      });
    }

    const newOrder = new Order({
      customerName,
      phone,
      address,
      note,
      items,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Đặt hàng thành công",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi đặt hàng",
      error: error.message,
    });
  }
});

// Lấy danh sách đơn hàng
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy danh sách đơn hàng",
      error: error.message,
    });
  }
});

module.exports = router;