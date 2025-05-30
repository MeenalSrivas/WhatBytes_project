"use client"; 

import React, { createContext, useReducer, useContext, useEffect, ReactNode, useMemo } from 'react';
import  { Product, CartItem } from '../../types'; 

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } } 
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };
interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': 
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
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
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

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem('shoppingCart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) { 
             dispatch({ type: 'LOAD_CART', payload: parsedCart });
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
          localStorage.removeItem('shoppingCart'); 
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('shoppingCart', JSON.stringify(state.items));
    }
  }, [state.items]);

  const addToCart = (product: Product, quantityToAdd: number = 1) => {
  dispatch({ type: 'ADD_ITEM', payload: { product, quantity: quantityToAdd } });
};

  

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const totalPrice = useMemo(() => {
    return state.items.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace('$', '')); 
      return sum + priceValue * item.quantity;
    }, 0);
  }, [state.items]);


  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart, 
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

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

