// frontend/src/pages/categories/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next'; // Import specific Next.js types
import { fetchCategories, fetchProducts } from '../../utils/api'; // Corrected path relative to pages/[slug]/
import ProductCard from '../../components/ProductCard'; // Corrected path relative to pages/[slug]/
import Head from 'next/head';

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

interface CategoryPageProps {
  products: Product[];
  categoryName: string;
  categorySlug: string;
}

export default function CategoryPage({ products, categoryName }: CategoryPageProps) {
  return (
    <div className="p-4">
      <Head>
        <title>{categoryName} - Zyon E-commerce</title>
        {/* More specific meta tags for SEO */}
      </Head>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{categoryName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

// getStaticPaths is required for dynamic routes with getStaticProps
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchCategories();
  const paths = categories.map((category: { slug: string }) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // 'blocking' will server-render new paths on demand
    // For large sites, 'true' (shows loading state) or 'blocking' is better than 'false'
  };
};

// getStaticProps to fetch data for each category page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.slug as string;
  const products = await fetchProducts(categorySlug);

  const allCategories = await fetchCategories();
  const currentCategory = allCategories.find((cat: { slug: string }) => cat.slug === categorySlug);
  const categoryName = currentCategory ? currentCategory.name : categorySlug;

  return {
    props: {
      products,
      categoryName,
      categorySlug, // Pass slug too if needed on page
    },
  };
};