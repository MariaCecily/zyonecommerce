// pages/categories/[slug].tsx

import React, { useEffect, useState } from 'react'; // Correct import for React hooks
import { Product, Category } from '../../../src/types'; 
import { useRouter } from 'next/router';
import { fetchProducts } from '../../../src/utils/api'; // Assuming you fetch products by category slug here
// Make sure the path to api.ts is correct: it's likely '../../../src/utils/api'
// depending on your exact file structure.
// E.g., import { fetchProducts } from '../../../src/utils/api';


// Remove or comment out GetStaticPaths and GetStaticProps functions entirely:
// export const getStaticPaths: GetStaticPaths = async () => { ... }
// export const getStaticProps: GetStaticProps = async ({ params }) => { ... }


function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query; // Get the category slug from the URL
  const [products, setProducts] = useState<any[]>([]); // Use a more specific type if you have one
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
        setProducts(fetchedProducts.results || fetchedProducts); // Adjust based on your API response structure
      } catch (err: any) {
        console.error(`Failed to fetch products for category ${slug}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getCategoryProducts();
  }, [slug]); // Re-run this effect whenever the slug changes

  // --- Render based on loading, error, or data ---
  if (loading) {
    return <p>Loading products for category "{slug}"...</p>;
  }

  if (error) {
    return <p>Error loading products: {error.message || 'Unknown error'}</p>;
  }

  if (products.length === 0) {
    return <p>No products found for category "{slug}".</p>;
  }

  // If we reach here, products data is available
  return (
    <div>
      <h1>Products in category "{slug}"</h1>
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