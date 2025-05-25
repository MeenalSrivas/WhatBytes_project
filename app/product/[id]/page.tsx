import { use } from 'react';

import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/data'; 
import ProductDetailsClientUI from '../../../components/ProductDetailClient'; 


export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {

  const resolvedParams = use(props.params);
  const id: string = resolvedParams.id;

  const product = getProductById(id); 

  if (!product) {
    console.log(`[ProductDetailPage] Product not found for id: "${id}". Calling notFound().`);
    notFound(); 
    return null; 
  }

  
  
  return <ProductDetailsClientUI product={product} />;
}