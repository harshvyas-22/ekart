import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (formData) => {
    try {
      const response = await fetch("https://ekart-4.onrender.com/products", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unexpected response format");
      }

      const data = await response.json();

      if (!response.ok) {
        console.error("Server Error:", data);
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
    const response = await fetch(
      `https://ekart-4.onrender.com/products/${updatedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );

    const data = await response.json();
    console.log("Server response:", data); 

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update product",
      };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === updatedProduct._id ? data.data : product
      ),
    }));
    return { success: true, message: "Product updated successfully" };
  },
  deleteProduct: async (id) => {
    const response = await fetch(
      `https://ekart-4.onrender.com/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "Failed to delete product",
      };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
  fetchProducts: async () => {
    const response = await fetch("https://ekart-4.onrender.com/products");

    if (!response.ok) {
      return { success: false, message: "Failed to fetch products" };
    }

    const data = await response.json();
    set({ products: data.data });
    return { success: true, message: "Products fetched successfully" };
  },
}));
