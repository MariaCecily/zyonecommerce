// frontend/src/pages/products/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next'; // Import specific Next.js types
import { fetchProducts, fetchProductBySlug } from '../../utils/api'; // Corrected path relative to pages/[slug]/
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

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

interface ProductDetailPageProps {
  product: Product | null; // Product can be null if not found
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  if (!product) {
    return (
      <div className="text-center py-10 text-xl text-gray-600">
        Product not found.
      </div>
    );
  }

  const imageUrl = product.image
    ? `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL?.replace('/api', '')}${product.image}`
    : `https://placehold.co/600x400/e2e8f0/1a202c?text=${product.name.replace(/ /g, '+')}`;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
      <Head>
        <title>{product.name} - Zyon E-commerce</title>
        <meta name="description" content={product.description || `Buy ${product.name} at Zyon E-commerce`} />
        {/* More SEO meta tags */}
      </Head>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[300px] bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/1a202c?text=Image+Not+Found`;
            }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">₹{product.price}</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description || "No description available."}</p>
          </div>

          <div className="flex items-center justify-between mb-6">
            {product.stock > 0 && product.available ? (
              <span className="text-lg font-semibold text-green-600">In Stock: {product.stock} units</span>
            ) : (
              <span className="text-lg font-semibold text-red-600">Out of Stock</span>
            )}
            <span className="text-md text-gray-500">
              Category: <Link href={`/categories/${product.category.slug}`} className="text-blue-600 hover:underline">{product.category.name}</Link>
            </span>
          </div>

          {/* Add to Cart button (example - functionality not fully implemented here) */}
          <button
            className={`w-full py-3 rounded-md text-white font-semibold transition duration-300 ${
              product.available && product.stock > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!product.available || product.stock <= 0}
          >
            {product.available && product.stock > 0 ? 'Add to Cart' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}

// getStaticPaths is required for dynamic routes with getStaticProps
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts();
  const paths = products.map((product: { slug: string }) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // 'blocking' will server-render new paths on demand
  };
};

// getStaticProps to fetch data for each product page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productSlug = params?.slug as string;
  const product = await fetchProductBySlug(productSlug);

  if (!product) {
    // If product is not found, return 404 (or redirect)
    return {
      notFound: true,
      revalidate: 60, // Still revalidate to pick up changes
    };
  }

  return {
    props: {
      product,
    },
  };
};