// frontend/src/components/Navbar.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../utils/api'; // Corrected path relative to components/

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <nav className="bg-gray-800 p-4 shadow-md rounded-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Brand Logo/Name */}
        <Link href="/" className="text-white text-2xl font-bold rounded-md px-2 py-1 hover:bg-gray-700 transition duration-300">
          Zyon Store
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0">
            <li>
              <Link href="/" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            {/* Add other static links here, e.g., Cart, Account, About Us */}
            <li>
              <Link href="/cart" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}