import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/data'; 
import {QuantitySelector}   from '../../../components/QuantitySelector';

export default async function ProductDetailPage({ params: { id } }: { params: { id:string } }) {
  
  const  product = getProductById(id);

  if (!product) {
    notFound();
  }
 
 
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/2">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image || '/images/placeholder-product.jpg'}
              alt={product.title}
              fill
              className="object-cover"
              priority 
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
           <QuantitySelector />
          </div>

          <button
            // onClick={() => addToCart(product, selectedQuantity)} // Logic to be added with cart context
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>

     
        
    </div>
  );
}