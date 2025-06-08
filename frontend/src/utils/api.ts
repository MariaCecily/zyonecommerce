// frontend/src/utils/api.ts

import axios from 'axios';

// --- TypeScript Interfaces for your API Data ---
// Define these based on the actual structure of data returned by your Django backend

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  // Add any other properties your product object has, e.g.:
  // image_url: string;
  // category: number; // or string, depending on how your API represents it
  // created_at: string;
  // updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  // Add any other properties your category object has
}

// --- End of TypeScript Interfaces ---


// Default to 'http://localhost:8000' for local development.
// This environment variable will be set on Render.com for production.
const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  // Ensure this line is commented out or removed for production deployments on Render.com.
  // Render handles HTTPS, and this setting can cause issues.
  // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
});

export const fetchCategories = async (): Promise<Category[]> => { // Added return type
  try {
    const response = await api.get<Category[]>('/api/categories/'); // Specify response data type
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Modified to use query parameters for category filtering
export const fetchProducts = async (categorySlug?: string): Promise<Product[]> => { // Added return type
  try {
    let url = '/api/products/';
    if (categorySlug) {
      url += `?category_slug=${categorySlug}`;
    }
    const response = await api.get<Product[]>(url); // Specify response data type
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => { // Added return type
  try {
    const response = await api.get<Product>(`/api/products/${slug}/`); // Specify response data type
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
};

// Add more API calls here for cart, orders, authentication, etc.