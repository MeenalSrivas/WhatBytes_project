"use client";
import Sidebar from '../components/Sidebar';      
import ProductGrid from '../components/ProductGrid';  
import  { Product } from '../types';     
import { SampleProducts } from '../lib/data'; 
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { useMemo } from 'react';     




export default function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return SampleProducts; // Return all products if no search query
    }
    return SampleProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.categoryName && product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]); 
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}