import React from 'react';
import { useFormik } from 'formik';

const ProductEdit = ({ product, onSave, onCancel }) => {
  const initialValues = product || {
    productId: '',
    productName: '',
    productDescription: '',
    productSize: '',
    productPrice: 0,
    productCategory: '',
    productTag: '',
    images: [],
  };

  const validate = (values) => {
    const errors = {};
    if (!values.productId) {
      errors.productId = 'Required';
    }
    if (!values.productName) {
      errors.productName = 'Required';
    }
    if (values.productPrice <= 0) {
      errors.productPrice = 'Must be greater than zero';
    }
    return errors;
  };

  const onSubmit = (values) => {
    onSave(values);
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
    enableReinitialize: true,
  });

//   const handleImageChange = (e, index) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       const updatedImages = [...selectedImages];
//       updatedImages[index] = files[0];
//       setSelectedImages(updatedImages);
//     } else {
//       const updatedImages = [...selectedImages];
//       updatedImages[index] = null;
//       setSelectedImages(updatedImages);
//     }
//   };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue('images', files.map((file) => file.name));
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <div className="mb-4">
        <label htmlFor="productId" className="block font-medium text-gray-700 mb-1">Product ID:</label>
        <input
          type="text"
          id="productId"
          name="productId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productId}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.productId && formik.errors.productId && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.productId}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="productName" className="block font-medium text-gray-700 mb-1">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productName}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.productName && formik.errors.productName && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.productName}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="productDescription" className="block font-medium text-gray-700 mb-1">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          onChange={formik.handleChange}
          value={formik.values.productDescription}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productSize" className="block font-medium text-gray-700 mb-1">Product Size:</label>
        <input
          type="text"
          id="productSize"
          name="productSize"
          onChange={formik.handleChange}
          value={formik.values.productSize}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productPrice" className="block font-medium text-gray-700 mb-1">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productPrice}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.productPrice && formik.errors.productPrice && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.productPrice}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="productCategory" className="block font-medium text-gray-700 mb-1">Product Category:</label>
        <input
          type="text"
          id="productCategory"
          name="productCategory"
          onChange={formik.handleChange}
          value={formik.values.productCategory}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productTag" className="block font-medium text-gray-700 mb-1">Product Tag:</label>
        <input
          type="text"
          id="productTag"
          name="productTag"
          onChange={formik.handleChange}
          value={formik.values.productTag}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductEdit;