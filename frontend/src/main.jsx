import React from "react"; // Add this line
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <App />
  </BrowserRouter>
);
