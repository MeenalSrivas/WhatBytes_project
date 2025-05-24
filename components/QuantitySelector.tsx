"use client"; 

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  initialQuantity?: number;
}

export function QuantitySelector({ initialQuantity = 1 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1); 
    setQuantity(newQuantity);
    
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md w-fit">
      <button
        onClick={handleDecrement}
        className="p-2 text-gray-700 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
      >
        <Minus size={18} />
      </button>
      <input
        type="text" 
        value={quantity}
        readOnly 
        className="w-12 text-center border-l border-r border-gray-300 focus:outline-none text-md font-medium"
        aria-label="Current quantity"
      />

      
      <button
        onClick={handleIncrement}
        className="p-2 text-gray-700 hover:bg-gray-100 rounded-r-md"
        aria-label="Increase quantity"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}