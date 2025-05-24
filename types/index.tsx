export interface Product {
  id:string;
  title :string;
  image: string;
  price: string; 
  description: string,
  categoryName: string,
}

export interface CartItem extends Product {
  quantity: number;
}