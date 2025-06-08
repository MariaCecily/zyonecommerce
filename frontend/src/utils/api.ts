// frontend/src/utils/api.ts

import axios from 'axios';

// Default to 'http://localhost:8000' for local development.
// This environment variable will be set on Render.com for production.
const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  // Ensure this line is commented out or removed for production deployments on Render.com.
  // Render handles HTTPS, and this setting can cause issues.
  // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
});

export const fetchCategories = async () => {
  try {
    const response = await api.get('/api/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Modified to use query parameters for category filtering
export const fetchProducts = async (categorySlug?: string) => {
  try {
    let url = '/api/products/';
    if (categorySlug) {
      url += `?category_slug=${categorySlug}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/api/products/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
};

// Add more API calls here for cart, orders, authentication, etc.