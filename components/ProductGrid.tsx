import ProductCard from './ProductCard'; 
import  { Product } from '../types'; 

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 col-span-full">No products found.</p>;
  }

 
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}