"use client"; 
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../app/context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


export default function Header() {
const { totalItems } = useCart(); 
const router = useRouter();
const searchParams = useSearchParams();

const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);


const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/'); 
    }
  };


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-gray-800">
          <ShoppingBag className="text-blue-600 hover:text-blue-700 transition-colors duration-200" // Example: Use your theme's blue
    size={36} // Explicitly set size (e.g., 32, 36, 40, 48 pixels)
    strokeWidth={2} />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex-grow max-w-xl mx-4"
          role="search"
        >

        <div className="flex-grow max-w-xl mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search for products..."
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            <button type="submit" className="sr-only">Search</button>
          
          </div>
        </div>
        </form>

        <Link
          href="/cart"
          className="flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-150 relative"
        >
          <ShoppingCart size={20} />
          <span className="ml-2 text-sm font-medium">Cart</span>
          {totalItems > 0 && ( // Use totalItems from context
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}