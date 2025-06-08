// frontend/src/pages/index.tsx
import { fetchProducts } from '../utils/api'; // Corrected path relative to pages/
import ProductCard from '../components/ProductCard'; // Corrected path relative to pages/
import Head from 'next/head'; // For page-specific metadata

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  image?: string;
  stock: number;
  available: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

interface HomePageProps {
  products: Product[];
}

export default function HomePage({ products }: HomePageProps) {
  return (
    <div className="p-4">
      <Head>
        <title>Zyon E-commerce - Home</title>
        {/* You can add more specific meta tags here */}
      </Head>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome to Zyon Store!</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Discover our amazing products across various categories.</p>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found. Please add some from the Django admin!</p>
        )}
      </div>
    </div>
  );
}

// Data fetching function for static site generation
export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: {
      products,
    },
  };
}