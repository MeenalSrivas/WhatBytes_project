"use client"; 
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../app/context/CartContext';
import { ShoppingBag } from 'lucide-react';


export default function Header() {
const { totalItems } = useCart(); 
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-gray-800">
          <ShoppingBag />
        </Link>

        <div className="flex-grow max-w-xl mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search for products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

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