import { create } from "zustand";

const BASE_URL = "https://ekart-4.onrender.com/";

export const useProductStore = create((set, get) => ({
  products: [],
  cart: [],

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Fetched Products:", data);

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to fetch products",
        };
      }

      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      console.error("Fetch Products Error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  createProduct: async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Create Product Error:", data);
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Network Error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  updateProduct: async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/products/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to update product",
        };
      }

      set((state) => ({
        products: state.products.map((p) =>
          p._id === updatedProduct._id ? data.data : p
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Update Product Error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  deleteProduct: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to delete product",
        };
      }

      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Delete Product Error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Fetch cart items from the server
  fetchCart: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to fetch cart:", data.message);
        return;
      }

      set({ cart: data.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  // Add product to cart
  addToCart: async (product) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to add to cart:", data.message);
        return { success: false, message: data.message };
      }

      set({ cart: data.cart.items });
      return { success: true, message: "Product added to cart" };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Remove product from cart
  removeFromCart: async (productId) => {
    const cart = get().cart;
    set({ cart: cart.filter((item) => item._id !== productId) });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to remove product from cart",
        };
      }

      return { success: true, message: "Product removed from cart" };
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Checkout functionality
  checkout: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Checkout failed" };
      }

      return { success: true, message: "Checkout successful" };
    } catch (error) {
      console.error("Error during checkout:", error);
      return { success: false, message: "Network error occurred" };
    }
  },
}));
