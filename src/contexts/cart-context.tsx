'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  slug: string;
  quantity: number;
  size?: string;
  colour?: string;
  stock: number;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: {
    productId: string;
    variantId?: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    slug: string;
    quantity?: number;
    size?: string;
    colour?: string;
    stock?: number;
    category?: string;
  }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('theirpocket_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage on state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('theirpocket_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (newItem: {
    productId: string;
    variantId?: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    slug: string;
    quantity?: number;
    size?: string;
    colour?: string;
    stock?: number;
    category?: string;
  }) => {
    const qty = newItem.quantity || 1;
    const cartItemId = `${newItem.productId}-${newItem.variantId || 'default'}-${newItem.size || ''}-${newItem.colour || ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[existingIndex];
        const maxStock = newItem.stock ?? currentItem.stock ?? 99;
        const newQty = Math.min(currentItem.quantity + qty, maxStock);
        
        updatedCart[existingIndex] = {
          ...currentItem,
          quantity: newQty,
        };
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          id: cartItemId,
          productId: newItem.productId,
          variantId: newItem.variantId,
          name: newItem.name,
          price: newItem.price,
          originalPrice: newItem.originalPrice,
          image: newItem.image,
          slug: newItem.slug,
          quantity: qty,
          size: newItem.size,
          colour: newItem.colour,
          stock: newItem.stock ?? 99,
          category: newItem.category,
        },
      ];
    });

    toast.success(`Added "${newItem.name}" to your cart!`, {
      description: newItem.size || newItem.colour ? `Option: ${[newItem.size, newItem.colour].filter(Boolean).join(' / ')}` : undefined,
      action: {
        label: 'View Cart',
        onClick: () => setIsCartOpen(true),
      },
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const clampedQty = Math.min(quantity, item.stock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
