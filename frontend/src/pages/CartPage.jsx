import React, { useState, useEffect } from "react";
import { useProductStore } from "../store/product";
import { FaTrash } from "react-icons/fa"; 
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, fetchCart, removeFromCart, checkout } = useProductStore();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchCart(); 
  }, [fetchCart]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const { success, message } = await removeFromCart(productId);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error removing item from cart.");
    }
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const { success, message } = await checkout();
      setIsCheckoutLoading(false);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      setIsCheckoutLoading(false);
      toast.error("Error during checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty. Add some products to the cart!
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((cartItem) => (
            <div
              key={cartItem._id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={cartItem.product.image} // Now using product.image
                  alt={cartItem.product.name} // Now using product.name
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-xl font-semibold">{cartItem.product.name}</h2> {/* Using product.name */}
                  <p className="text-gray-700">₹{cartItem.product.price}</p> {/* Using product.price */}
                  <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(cartItem._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
              >
                <FaTrash />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
