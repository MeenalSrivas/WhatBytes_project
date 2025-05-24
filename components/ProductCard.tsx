import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '../types'; 

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, image, title, price } = product; 
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group">
      <Link href={`/product/${id}`} className="block"> 
        <div className="relative w-full aspect-square overflow-hidden"> 
          <Image
            src={image || '/images/placeholder-product.jpg'} 
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow"> 
        <Link href={`/product/${id}`} className="block">
          <h3
            className="text-md font-semibold text-gray-800 group-hover:text-blue-600 truncate mb-1"
            title={title} 
          >
            {title}
          </h3>
        </Link>

        <p className="text-lg font-bold text-gray-900 mb-3">{price}</p>

        {/* "Add to Cart" button pushed to the bottom */}
        <button className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
}