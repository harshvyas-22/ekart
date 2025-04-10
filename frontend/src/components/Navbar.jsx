import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // to detect route change

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  // 🔁 This will re-run on every route change or refresh
  useEffect(() => {
    setIsLoggedIn(checkTokenValidity());
  }, [location]);

  // 💡 Optional: Listen for manual localStorage changes (multi-tab logout/login)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(checkTokenValidity());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          EKART
        </Link>
        <div className="flex gap-4">
          <Link
            to="/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Product
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}

          <button
            className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition flex items-center gap-2"
            onClick={() => navigate("/")}
            style={{ fontSize: "1.5rem", marginLeft: "auto" }}
          >
            Home
          </button>

          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out flex items-center gap-2"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart
          </button>
        </div>
      </div>
    </nav>
  );
};
