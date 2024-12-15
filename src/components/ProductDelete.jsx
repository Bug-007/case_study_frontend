import React, { useState } from 'react';

const ProductDelete = ({ product, onDelete, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(product._id);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  if (!product) {
    return <div className="text-center text-gray-500 p-4">No product selected for deletion.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Delete Product</h2>
      {!showConfirmation ? (
        <div>
          <p className="mb-4">Are you sure you want to delete "{product.productName}" (ID: {product.productId})?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete Product
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">Confirm deletion of "{product.productName}"?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              No, Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDelete;