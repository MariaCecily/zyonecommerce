// frontend/src/utils/api.ts

import axios from 'axios';

// Default to 'http://localhost:8000' for local development.
// The '/api' suffix is handled by the individual API calls.
const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  // This is for local testing with self-signed certs (e.g., if Django is HTTPS locally)
  // REMOVE IN PRODUCTION OR IF YOUR BACKEND HAS VALID CERTIFICATES
  // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
});

export const fetchCategories = async () => {
  try {
    // Correct: /api/categories/
    const response = await api.get('/api/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Consider throwing the error or returning a more robust error object
    // to allow calling components to handle it
    throw error;
  }
};

// Modified to use query parameters for category filtering
export const fetchProducts = async (categorySlug?: string) => {
  try {
    let url = '/api/products/'; // Base URL for all products
    if (categorySlug) {
      // Append category slug as a query parameter
      // Make sure 'category_slug' matches your filterset_fields in Django's ProductViewSet
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
    // Correct: /api/products/{slug}/ - this assumes lookup_field = 'slug' in ProductViewSet
    const response = await api.get(`/api/products/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
};

// Add more API calls here for cart, orders, authentication, etc.