
import axios from 'axios';

const API_URL = '/api/products/';

// Create new product
const createProducts = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed the template literal usage
    },
  };

  try {
    const response = await axios.post(API_URL, productData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to create product');
  }
};

// Get all products
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed the template literal usage
    },
  };
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to get products');
  }
};

// Get a single product
const getProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed the template literal usage
    },
  };

  try {
    const response = await axios.get(`${API_URL}${productId}`, config); // Fixed URL formatting
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to get product');
  }
};

// Update a product
const updateProduct = async (productId, productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed the template literal usage
    },
  };

  try {
    const response = await axios.put(`${API_URL}${productId}`, productData, config); // Fixed URL formatting
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to update product');
  }
};

// Delete a product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed the template literal usage
    },
  };

  try {
    const response = await axios.delete(`${API_URL}${productId}`, config); // Fixed URL formatting
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to delete product');
  }
};

const productService = {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
