// pages/categories/[slug].tsx

import React, { useEffect, useState } from 'react'; // Correct import for React hooks
import { Product } from '../../../src/utils/types'; // Removed 'Category' if not used in this file
import { useRouter } from 'next/router';
import { fetchProducts } from '../../../src/utils/api'; // Assuming you fetch products by category slug here


function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query; // Get the category slug from the URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only attempt to fetch if the category slug is available
    if (!slug) {
      setLoading(false);
      return;
    }

    async function getCategoryProducts() {
      try {
        setLoading(true);
        setError(null);

        // Fetch products filtered by this category slug
        // Ensure 'fetchProducts' handles the categorySlug parameter
        const fetchedProducts = await fetchProducts(slug as string);
        setProducts(fetchedProducts);
      } catch (err: unknown) { // Changed 'any' to 'unknown'
        console.error(`Failed to fetch products for category ${slug}:`, err);
        if (err instanceof Error) { // Check if it's an Error instance
          setError(err); // Set the error state
        } else {
          setError(new Error(String(err))); // Convert unknown error to an Error object
        }
      } finally {
        setLoading(false);
      }
    }

    getCategoryProducts();
  }, [slug]); // Re-run this effect whenever the slug changes

  // --- Render based on loading, error, or data ---
  if (loading) {
    return <p>Loading products for category &quot;{slug}&quot;...</p>; // Fixed unescaped quote
  }

  if (error) {
    return <p>Error loading products: {error.message || 'Unknown error'}</p>;
  }

  if (products.length === 0) {
    return <p>No products found for category &quot;{slug}&quot;.</p>; // Fixed unescaped quote
  }

  // If we reach here, products data is available
  return (
    <div>
      <h1>Products in category &quot;{slug}&quot;</h1> {/* Fixed unescaped quote */}
      {/* Render your list of products */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;