import { use } from 'react';

import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/data'; 
import ProductDetailsClientUI from '../../../components/ProductDetailClient'; 

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

  //const resolvedParams = use(props.params);
  //const id: string = resolvedParams.id;
  const id = params.id; 

  const product = getProductById(id); 

  if (!product) {
    console.log(`[ProductDetailPage] Product not found for id: "${id}". Calling notFound().`);
    notFound(); 
    return null; 
  }



  
  return <ProductDetailsClientUI product={product} />;
}