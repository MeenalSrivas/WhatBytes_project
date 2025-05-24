// context/CartContext.tsx
"use client"; // This Context will be used by Client Components

import React, { createContext, useReducer, useContext, useEffect, ReactNode, useMemo } from 'react';
import  { Product, CartItem } from '../../types'; // Adjust path as needed

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } } // MODIFIED
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };
// 2. Define the Context Shape
interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// 3. Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Create the Reducer Function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': // MODIFIED
  const { product, quantity } = action.payload;
  const existingItemIndex = state.items.findIndex(item => item.id === product.id);
  if (existingItemIndex > -1) {
    const updatedItems = state.items.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + quantity } // Add to existing quantity
        : item
    );
    return { ...state, items: updatedItems };
  } else {
    return { ...state, items: [...state.items, { ...product, quantity }] }; // Add as new item with specified quantity
  }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

// 5. Create the CartProvider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on initial mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem('shoppingCart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) { // Basic validation
             dispatch({ type: 'LOAD_CART', payload: parsedCart });
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
          localStorage.removeItem('shoppingCart'); // Clear corrupted cart
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever items change (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('shoppingCart', JSON.stringify(state.items));
    }
  }, [state.items]);

  // Memoized functions to dispatch actions
  const addToCart = (product: Product, quantityToAdd: number = 1) => {
  dispatch({ type: 'ADD_ITEM', payload: { product, quantity: quantityToAdd } });
};

  // Refined addToCart and reducer for ADD_ITEM
  // (This will be done in the next iteration when we integrate QuantitySelector)
  // For now, the reducer's ADD_ITEM adds 1 or increments by 1.
  // We'll refine this when connecting QuantitySelector.

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate total items and price
  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const totalPrice = useMemo(() => {
    return state.items.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace('$', '')); // Assuming price is like "$99.00"
      return sum + priceValue * item.quantity;
    }, 0);
  }, [state.items]);


  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart, // This will be a simplified version for now
        removeFromCart,
        updateItemQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 6. Create a Custom Hook to use the Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Refined CartAction and Reducer for ADD_ITEM to accept quantity
// Update these at the top of the file:
/*
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } } // MODIFIED
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': // MODIFIED
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, { ...product, quantity }] };
      }
    // ... other cases remain the same ...
    default:
      return state;
  }
};

// Then, update the addToCart function in CartProvider:
// const addToCart = (product: Product, quantityToAdd: number = 1) => {
//   dispatch({ type: 'ADD_ITEM', payload: { product, quantity: quantityToAdd } });
// };
*/
// For this first pass, let's keep the initial simpler ADD_ITEM reducer logic.
// We will refine addToCart and its reducer interaction when integrating with QuantitySelector on product page.