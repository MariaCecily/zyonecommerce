// frontend/src/components/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string; // Use string for DecimalField from Django
  image?: string; // Optional image URL
  stock: number;
  available: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image
    ? `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL?.replace('/api', '')}${product.image}`
    : `https://placehold.co/400x300/e2e8f0/1a202c?text=${product.name.replace(/ /g, '+')}`; // Placeholder image

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        <div className="relative w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center">
          {/* Using Next.js Image component for optimization */}
          <Image
            src={imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              // Fallback to a different placeholder if the primary URL fails
              e.currentTarget.src = `https://placehold.co/400x300/e2e8f0/1a202c?text=Image+Not+Found`;
            }}
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
          <p className="text-gray-700 font-bold mb-4">₹{product.price}</p>
          <div className="flex-grow"></div> {/* Pushes content to bottom */}
          {product.stock > 0 && product.available ? (
            <span className="text-sm text-green-600">In Stock ({product.stock})</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
          {/* Add a "Add to Cart" button here later */}
        </div>
      </div>
    </Link>
  );
}