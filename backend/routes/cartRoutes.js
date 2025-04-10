import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { protectRoute } from "./protectRoute.js";

const router = express.Router();
router.get("/", protectRoute, getCart);
router.post("/add", protectRoute, addToCart);
router.delete("/remove", protectRoute, removeFromCart);

export default router;
