const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" });
  }
});

// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    if (!name || !price || !category || !image || !description) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin sản phẩm",
      });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      image,
      description,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Thêm sản phẩm thành công",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi thêm sản phẩm",
      error: error.message,
    });
  }
});

// Sửa sản phẩm
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        image,
        description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.json({
      message: "Cập nhật sản phẩm thành công",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi cập nhật sản phẩm",
      error: error.message,
    });
  }
});

// Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa sản phẩm",
      error: error.message,
    });
  }
});

module.exports = router;