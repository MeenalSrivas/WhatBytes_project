import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/data'; 
import ProductDetailsClientUI from '../../../components/ProductDetailClient';

export default async function ProductDetailPage({ params: { id } }: { params: { id:string } }) {
  
  const  product = getProductById(id);

  if (!product) {
    notFound();
  }
 
 
  
  return (
    <ProductDetailsClientUI product={product} />
  )
}