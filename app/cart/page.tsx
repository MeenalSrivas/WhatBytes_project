// app/cart/page.tsx
"use client"; // This page is now interactive and uses client-side state

import Link from 'next/link';
import Image from 'next/image';
import {QuantitySelector} from '../../components/QuantitySelector';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import useCart

// Remove MockCartItem type and mock data, as we'll use actual cart data

// export const metadata: Metadata = { // Metadata for client components is handled differently or via generateMetadata if part remains server
//   title: 'Your Shopping Cart',
//   description: 'Review items in your shopping cart and proceed to checkout.',
// };
// For client components, set title using useEffect or a library if needed, or rely on layout's metadata.

export default function CartPage() {
  const { items, updateItemQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <title>Your Shopping Cart</title> {/* Simple way to set title client-side */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {items.map((item) => {
              const itemPriceValue = parseFloat(item.price.replace('$', ''));
              const itemSubtotal = itemPriceValue * item.quantity;

              return (
                <div
                  key={item.id} // Use product ID as key if cart item ID is not separate
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || '/images/placeholder-product.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link href={`/product/${item.id}`} className="hover:text-blue-600"> {/* Link to product id */}
                      <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.price} (each)</p>
                  </div>
                  <div className="my-2 sm:my-0 sm:w-32">
                    <QuantitySelector
                      initialQuantity={item.quantity}
                      onQuantityChange={(newQuantity) => updateItemQuantity(item.id, newQuantity)}
                    />
                  </div>
                  <p className="font-semibold text-gray-800 w-24 text-left sm:text-right">
                    ${itemSubtotal.toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                {/* Basic shipping display logic */}
                <span className={totalPrice > 0 ? "text-green-600" : ""}> 
                  {totalPrice === 0 ? "$0.00" : (shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "FREE")} 
                </span>
              </div>
              <hr className="my-2 border-gray-300" />
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice > 0 ? shippingCost : 0)).toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example: Define a placeholder shipping cost or logic if not part of your context
const shippingCost = 5.00; // Or more complex logic