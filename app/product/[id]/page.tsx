
import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/data'; 
import ProductDetailsClientUI from '../../../components/ProductDetailClient'; // Adjust path if needed

export async function generateMetadata({ params }: { params: { id: string } }) {
  console.log('[generateMetadata] Received params:', params);
  if (!params || typeof params.id !== 'string') {
    console.error('[generateMetadata] Invalid params or params.id for metadata:', params);
    return { title: 'Error loading product metadata' };
  }
  const product = getProductById(params.id);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return { title: product.title, description: product.description };
}


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  console.log('--- [ProductDetailPage START] ---');
  console.log('[ProductDetailPage] Received props.params:', params);

  if (!params || typeof params.id !== 'string') {
    console.error('[ProductDetailPage] ERROR: Invalid params object or params.id is not a string.');
    console.log('[ProductDetailPage] Params received:', params);
    notFound(); 
    return null; 
  }

  const id: string = params.id; 
  console.log(`[ProductDetailPage] Extracted id: "${id}" (type: ${typeof id})`);

  const product = getProductById(id); 

  if (!product) {
    console.log(`[ProductDetailPage] Product not found for id: "${id}". Calling notFound().`);
    notFound(); 
    return null; 
  }

  console.log(`[ProductDetailPage] Product found: ${product.title}`);
  console.log('--- [ProductDetailPage END] ---');

  
  return <ProductDetailsClientUI product={product} />;
}