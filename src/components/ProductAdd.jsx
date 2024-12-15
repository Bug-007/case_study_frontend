import React, { useEffect, useState } from 'react';

const ProductAdd = ({ onSave, onCancel }) => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState(Array.from({ length: 1 }, () => null));

  useEffect(() => {
    const previews = selectedImages.map(image => image && URL.createObjectURL(image));
    return () => previews.forEach(preview => preview && URL.revokeObjectURL(preview));
  }, [selectedImages]);

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files.length > 0) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = files[0];
      setSelectedImages(updatedImages);
    } else {
      const updatedImages = [...selectedImages];
      updatedImages[index] = null;
      setSelectedImages(updatedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImages.some(image => image !== null)) {
      try {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productSize', productSize);
        formData.append('productCategory', productCategory);
        formData.append('productId', productId);

        for (const selectedImage of selectedImages) {
          if (selectedImage) {
            formData.append('images[]', selectedImage);
          }
        }

        const response = await onSave(formData);
        if (response?.data?.message === "Uploaded") {
          // Optionally reset form fields after successful upload
          setProductId('');
          setProductName('');
          setProductDescription('');
          setProductPrice('');
          setProductSize('');
          setProductCategory('');
          setSelectedImages(Array.from({ length: 4 }, () => null));
        }
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    } else {
      console.warn('No images selected for upload.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Add Product</h2>
            <p className="text-gray-600">Add new products from here.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="productId" className="block text-gray-700 text-sm font-bold mb-2">Product ID</label>
            <input type="text" id="productId" placeholder="Enter a unique string" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={productId} onChange={(e) => setProductId(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
            <input type="text" id="productName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">Product Description</label>
            <textarea id="productDescription" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20 resize-y" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">Product Price</label>
            <input type="number" id="productPrice" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="productSize" className="block text-gray-700 text-sm font-bold mb-2">Product Size</label>
            <input type="text" id="productSize" placeholder="Enter any of S/M/L/XL/XXL" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={productSize} onChange={(e) => setProductSize(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="productCategory" className="block text-gray-700 text-sm font-bold mb-2">Product Category</label>
            <input type="text" id="productCategory" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload product Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative border rounded-md p-2">
                <input type="file" id={index} name="images" onChange={(e) => handleImageChange(e, index)} className="hidden" />
                <label htmlFor={index} className="cursor-pointer block w-full h-24 bg-gray-200 rounded-md flex items-center justify-center">
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} className="object-cover w-full h-full rounded-md" />
                  ) : (
                    <span className="text-gray-500">+</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;