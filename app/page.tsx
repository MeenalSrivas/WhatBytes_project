// app/page.tsx
import Sidebar from '../components/Sidebar';      // Relative path
import ProductGrid from '../components/ProductGrid';  // Relative path
import type { Product } from '../types';           // Relative path

// Sample Product Data (matches the image where possible, 'rating' removed)
const sampleProducts: Product[] = [
  { id: '1', image: '/images/running-shoes.png', title: 'Running Shoes', price: '$99' },
  { id: '2', image: '/images/wireless-headphones.png', title: 'Wireless Headphones', price: '$129' },
  { id: '3', image: '/images/backpack.png', title: 'Backpack', price: '$129' },
  { id: '4', image: '/images/smartwatch.png', title: 'Smartwatch', price: '$249' },
  { id: '5', image: '/images/sunglasses.png', title: 'Sunglasses', price: '$149' },
  { id: '6', image: '/images/digital-camera.png', title: 'Digital Camera', price: '$499' },
  { id: '7', image: '/images/t-shirt.png', title: 'T-shirt', price: '$29' },
  {
    id: '8',
    image: '/images/smartphone.png',
    title: 'Smartphone',
    price: '$699',
   
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={sampleProducts} />
        </div>
      </div>
    </div>
  );
}