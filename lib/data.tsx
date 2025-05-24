import type { Product } from '../types'; 
// Re-export Product type if you want to import it from here

export const SampleProducts: Product[] = [
  { id: '1', image: '/images/running-shoes.png', title: 'Running Shoes', price: '$99', description: 'High-performance running shoes for daily runs and training.', categoryName: 'Footwear' },
  { id: '2', image: '/images/wireless-headphones.png', title: 'Wireless Headphones', price: '$129', description: 'Immersive sound quality with noise cancellation.', categoryName: 'Electronics' },
  { id: '3', image: '/images/backpack.png', title: 'Backpack', price: '$129', description: 'Durable and spacious backpack for all your needs.', categoryName: 'Accessories' },
  { id: '4', image: '/images/smartwatch.png', title: 'Smartwatch', price: '$249', description: 'Stay connected and track your fitness goals.', categoryName: 'Electronics' },
  { id: '5', image: '/images/sunglasses.png', title: 'Sunglasses', price: '$149', description: 'Stylish UV protection for your eyes.', categoryName: 'Accessories' },
  { id: '6', image: '/images/digital-camera.png', title: 'Digital Camera', price: '$499', description: 'Capture stunning photos and videos with ease.', categoryName: 'Electronics' },
  { id: '7', image: '/images/t-shirt.png', title: 'T-shirt', price: '$29', description: 'Comfortable cotton t-shirt for everyday wear.', categoryName: 'Clothing' },
  {
    id:'8',
    image: '/images/smartphone.png',
    title: 'Smartphone',
    price: '$699',
    description: 'The latest smartphone with cutting-edge features and a stunning display.',
    categoryName: 'Electronics',
  },
];

export function getProductById(id:string): Product | undefined {
  return SampleProducts.find(product => product.id === id);
}