// pages/index.tsx

import React, { useEffect, useState } from 'react';
import { Product, Category } from '../utils/types';
import { fetchProducts, fetchCategories } from '../../src/utils/api';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // If you display categories too
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch products for the homepage
        const fetchedProducts = await fetchProducts(); // Call without category slug for all products
        setProducts(fetchedProducts);

        // If you also display categories on the homepage
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

      } catch (err: unknown) { // Corrected from 'any' to 'unknown'
        console.error('Error fetching homepage data:', err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <p>Loading homepage content...</p>;
  }

  if (error) {
    return <p>Error loading homepage: {error.message || 'Unknown error'}</p>;
  }

  return (
    <div>
      <h1>Welcome to Zyon E-commerce!</h1>
      <h2>Featured Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}

      {/* Optional: Display categories if needed */}
      {categories.length > 0 && (
        <>
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default HomePage;