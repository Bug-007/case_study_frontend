import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { BASE_URL, PRODUCT, AUTH } from "../constants/API_ENDPOINTS";
import { useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import API from "../ApiHooks/axiosConfig";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(BASE_URL + PRODUCT.GET_PRODUCTS);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await API.get(BASE_URL + PRODUCT.GET_CATEGORIES);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await API.get(BASE_URL + AUTH.GET_LOGOUT); // Call logout function from AuthContext
      dispatch(logout());
      navigate("/"); // Redirect to login page after successful logout
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout errors gracefully (e.g., display an error message)
    }
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard"); // Assuming you have the dashboard route defined
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.productCategory === selectedCategory)
    : products;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Product List</h1>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 category-dropdown" 
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleNavigateToDashboard}
          >
            Dashboard
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="product-card
                       max-w-sm
                       bg-white
                       rounded-lg
                       shadow-md
                       dark:bg-gray-800
                       hover:bg-gray-100
                       dark:hover:bg-gray-700"
          >
            <img
              src={`${BASE_URL}${PRODUCT.GET_IMAGES}/${product.productId}/${product.images[0]}`}
              alt={product.productName}
              className="rounded-t-lg"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.productName}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Category: {product.productCategory}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Price: ${product.productPrice}
              </p>
              {/* Add more product details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;