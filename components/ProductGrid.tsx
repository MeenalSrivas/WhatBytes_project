// components/ProductGrid.tsx
import ProductCard from './ProductCard'; // Relative path
import  { Product } from '../types';  // Relative path

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 col-span-full">No products found.</p>;
  }

  // The expanded card in the image (Smartphone) seems to take more vertical space.
  // A true masonry or variable height grid is more complex.
  // For this example, we'll use a standard grid and let content flow.
  // The "Smartphone" card has more content, so it will naturally be taller.
  // If you want it to span columns, that would need more specific logic based on product ID or type.
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