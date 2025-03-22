import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast.success("Product deleted successfully! 🗑️");
    } else {
      toast.error(`Error: ${message}`);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      !editingProduct.name ||
      !editingProduct.price ||
      !editingProduct.image
    ) {
      toast.error("All fields are required!");
      return;
    }

    const { success, message } = await updateProduct(editingProduct);
    if (success) {
      toast.success("Product updated successfully! ✨");
      closeEditModal();
    } else {
      toast.error(`Error: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products available. Add a product!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">₹{product.price}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit Product
            </h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="image">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={editingProduct.image}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition mt-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
