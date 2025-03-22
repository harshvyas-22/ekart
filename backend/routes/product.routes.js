import express from "express";
import mongoose, { get } from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.post('/',createProduct );

router.delete('/:id',deleteProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);
export default router;