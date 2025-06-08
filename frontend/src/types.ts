// src/types.ts

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  // Add any other properties your product object has
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  // Add any other properties your category object has
}