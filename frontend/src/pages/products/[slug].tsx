// pages/products/[slug].tsx (assuming this is your actual file extension)

import React, { useEffect, useState } from 'react';
import { Product } from '../../../src/types'; // Removed 'Category' as it's not used here
import { useRouter } from 'next/router'; // Import useRouter
import { fetchProductBySlug } from '../../../src/utils/api'; // Adjust path if necessary


function ProductPage() {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const [product, setProduct] = useState<Product | null>(null); // Use a more specific type if you have one
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only attempt to fetch if the slug is available in the URL
    if (!slug) {
      setLoading(false); // No slug means nothing to fetch yet
      return;
    }

    async function getProduct() {
      try {
        setLoading(true); // Start loading
        setError(null);    // Clear any previous errors

        // Fetch product using the slug
        const fetchedProduct = await fetchProductBySlug(slug as string);
        setProduct(fetchedProduct);
      } catch (err: unknown) { // Changed 'any' to 'unknown'
        console.error(`Failed to fetch product with slug ${slug}:`, err);
        if (err instanceof Error) { // Check if it's an Error instance
          setError(err); // Set the error state
        } else {
          setError(new Error(String(err))); // Convert unknown error to an Error object
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    }

    getProduct(); // Call the async function
  }, [slug]); // Re-run this effect whenever the slug changes in the URL

  // --- Render based on loading, error, or data ---
  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error loading product: {error.message || 'Unknown error'}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>; // Or redirect to a 404 page
  }

  // If we reach here, product data is available
  return (
    <div>
      <h1>{product.name}</h1>
      {/* Example of displaying product details */}
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      {/* Add more product details here */}
    </div>
  );
}

export default ProductPage;