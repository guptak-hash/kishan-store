//  api/productAPI.js

import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProductDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};