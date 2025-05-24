// app/page.tsx
import Sidebar from '../components/Sidebar';      
import ProductGrid from '../components/ProductGrid';  
import type { Product } from '../types';     
import { SampleProducts } from '../lib/data';      




export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={SampleProducts} />
        </div>
      </div>
    </div>
  );
}