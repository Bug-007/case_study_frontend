import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductAdd from '../components/ProductAdd';
import ProductEdit from '../components/ProductEdit';
import ProductDelete from '../components/ProductDelete';
import { BASE_URL, PRODUCT } from '../constants/API_ENDPOINTS';
import API from '../ApiHooks/axiosConfig';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const apiUrl = `${BASE_URL}${PRODUCT.GET_PRODUCTS}`;
  const apiUrlToAddNewProduct = `${BASE_URL}${PRODUCT.POST_ADD_NEW_PRODUCT}`;
  const apiUrlToDeleteProduct = `${BASE_URL}${PRODUCT.DELETE_PRODUCT}`;
  const apiUrlToUpdateProduct = `${BASE_URL}${PRODUCT.PUT_UPDATE_PRODUCT}`;

  const fetchProducts = async () => {
    try {
      const response = await API.get(apiUrl);
      setProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (user?.email !== "test@test.com") {
      navigate('/');
    }
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await API.post(apiUrlToAddNewProduct, newProduct,config);
      fetchProducts();
      setShowAddForm(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await API.put(`${apiUrlToUpdateProduct}/${updatedProduct._id}`, updatedProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await API.delete(`${apiUrlToDeleteProduct}/${productId}`);
      fetchProducts();
      setDeletingProduct(null);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Dashboard</h1>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate('/products')} 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Products
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <ProductAdd onSave={handleAddProduct} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.productId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.productPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingProduct(product)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingProduct && (
        <div className="mt-6">
          <ProductEdit
            product={editingProduct}
            onSave={handleEditProduct}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}

      {deletingProduct && (
        <div className="mt-6">
          <ProductDelete
            product={deletingProduct}
            onDelete={handleDeleteProduct}
            onCancel={() => setDeletingProduct(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;