
"use client"; 

import Image from 'next/image';
import Link from 'next/link'; 
import type { Product} from '../types'; 
import {QuantitySelector} from './QuantitySelector'; 

import { useCart } from '../app/context/CartContext'; 
import { useState } from 'react';

interface ProductDetailsClientUIProps {
  product: Product | null; 
}





export default function ProductDetailsClientUI({ product }: ProductDetailsClientUIProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useCart();

  
  if (!product) {
    
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-4">Sorry, the product data could not be loaded.</p>
        <Link href="/" className="text-blue-600 hover:text-blue-700">
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
    alert(`${selectedQuantity} x ${product.title} added to cart!`);
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg w-full max-w-md sm:max-w-lg">
            <Image
              src={product.image || '/images/placeholder-product.jpg'}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
          <p className="text-2xl lg:text-3xl font-semibold text-blue-600 mb-4">{product.price}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description || 'No description available.'}</p>
          </div>
          {product.categoryName && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Category</h2>
              <p className="text-gray-600">{product.categoryName}</p>
            </div>
          )}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Quantity</h2>
            <QuantitySelector
              initialQuantity={1} 
              onQuantityChange={setSelectedQuantity}
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>

      
      
    </div>
  );
}