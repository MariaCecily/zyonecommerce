// frontend/src/utils/api.ts

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProducts = async (categorySlug?: string) => {
  try {
    const url = categorySlug ? `/categories/${categorySlug}/products/` : '/products/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/products/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
};

// Add more API calls here for cart, orders, authentication, etc.