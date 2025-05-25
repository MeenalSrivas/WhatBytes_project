"use client";
import Sidebar from '../components/Sidebar';      
import ProductGrid from '../components/ProductGrid';  
import { SampleProducts } from '../lib/data'; 
import { useSearchParams } from 'next/navigation'; 
import { useMemo } from 'react';     
import { Suspense } from 'react';


const MAX_PRICE_SLIDER_VALUE = 1000; 
const DEFAULT_CATEGORY_FILTER = "All";



export default function HomePageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const selectedCategory = searchParams.get('category') || DEFAULT_CATEGORY_FILTER;
  const maxPrice = parseInt(searchParams.get('maxPrice') || MAX_PRICE_SLIDER_VALUE.toString(), 10);
  
  const filteredProducts = useMemo(() => {
    let productsToFilter = SampleProducts;

    if (searchQuery) {
      productsToFilter = productsToFilter.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== DEFAULT_CATEGORY_FILTER) {
      productsToFilter = productsToFilter.filter(product => product.categoryName === selectedCategory);
    }

    productsToFilter = productsToFilter.filter(product => {
      const priceValue = parseFloat(product.price.replace('$', ''));
      return priceValue <= maxPrice;
    });

    
    return productsToFilter;
  }, [searchQuery, selectedCategory, maxPrice]); 
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
         <Suspense> <Sidebar
          priceSliderMax={MAX_PRICE_SLIDER_VALUE} /></Suspense>
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}