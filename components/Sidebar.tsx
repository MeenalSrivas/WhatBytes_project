"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SidebarProps {
  
  priceSliderMax: number;
}

const DEFAULT_CATEGORY = "All";
const Default_brand = "All";


export default function Sidebar({ priceSliderMax }: SidebarProps) {
  const categories = ['All', 'Electronics', 'Clothing', 'Home'];
  const brands = ['All', 'Electronics brand', 'accesories brand', 'clothing brand'];
  
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentCategory, setCurrentCategory] = useState(DEFAULT_CATEGORY);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(priceSliderMax);
  const [currentBrand, setCurrentBrand] = useState(Default_brand);

useEffect(() =>{
  setCurrentBrand(searchParams.get('brand') || Default_brand);

},[searchParams])

 

  useEffect(() => {
    setCurrentCategory(searchParams.get('category') || DEFAULT_CATEGORY);
    setCurrentMaxPrice(parseInt(searchParams.get('maxPrice') || priceSliderMax.toString(), 10));
  }, [searchParams, priceSliderMax]);

  const updateURLFilters = useCallback((newFilterParams: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    for (const key in newFilterParams) {
      const value = String(newFilterParams[key]);
      if (key === "category" && value.toLowerCase() === DEFAULT_CATEGORY.toLowerCase()) {
        current.delete(key);
      } else if (key === "maxPrice" && value === String(priceSliderMax)) {
        current.delete(key);
      } else if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    }
    
    const query = current.toString();
    router.push(`/${query ? `?${query}` : ''}`, { scroll: false });
  }, [router, searchParams, priceSliderMax]);

  const handleCategoryChange = (category: string) => {
    //setCurrentCategory(category);
    updateURLFilters({ category });
  };

  const handleMaxPriceChange = (price: number) => {
    setCurrentMaxPrice(price);
    updateURLFilters({ maxPrice: price.toString() });
  };

 

  return (
    <aside className="rounded-lg shadow-lg overflow-hidden"> 
    <div className="bg-blue-600 text-white p-6"> 
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Category</h3>
        <ul className="space-y-2 text-sm">
          {categories.map((category) => (
            <li key={category}>
            
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio" 
                  name="category"
                  value={category.toLowerCase()}
                  checked={currentCategory === category}
                  
                  onChange={() => handleCategoryChange(category)}
                  className="form-radio h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-400 group-hover:border-blue-200 focus:ring-offset-0 focus:ring-offset-blue-600 focus:ring-blue-300 checked:bg-white checked:border-transparent"                  
                />
                <span className="ml-2">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <h3 className="text-lg font-medium mb-3">Max Price: ${currentMaxPrice}</h3>
        <input
          type="range"
          min="0"
          max={priceSliderMax}
          value={currentMaxPrice} 
          onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-2 px-1">
          <span>0</span>
          <span>${priceSliderMax}</span>
        </div>
      </div>
      </div>

      <div className="bg-white text-gray-700 p-6">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Brands</h3> 
        <ul className="space-y-2 text-sm">
          {brands.map((brand, index) => (
            <li key={brand}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  value={brand.toLowerCase()}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 
                               focus:ring-blue-500 focus:ring-offset-0
                               group-hover:border-gray-400"
                  defaultChecked={index === 0}
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900">{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3> 
        <input
              type="number"
              placeholder="5000"
              className="form-input w-full p-2 border border-gray-300 rounded-md 
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                         text-sm text-gray-900 placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
      </div>
      </div>
    </aside>
  );
}