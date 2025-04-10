import Cart from "../models/cart.js";
export const getCart = async (req, res) => {
  const userId = req.user;
  const cart = await Cart.findOne({ userId }).populate("items.product");
  res.json(cart || { userId, items: [] });
};
export const addToCart = async (req, res) => {
  const userId = req.user;
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1 });
  }

  await cart.save();
  res.json({ success: true, cart });
};

export const removeFromCart = async (req, res) => {
  const userId = req.user;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.json({ success: true, cart });
};
