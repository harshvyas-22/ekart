import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const createProduct = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price || !req.file) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, price, and image",
    });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("File delete error:", err);
    });

    const newProduct = new Product({
      user: req.user?._id,
      name,
      price,
      image: uploadResult.secure_url,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.user.toString() !== req.user?._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
      product.image = uploadResult.secure_url;
    }
    product.name = name || product.name;
    product.price = price || product.price;

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
