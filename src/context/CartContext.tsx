"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

type CartItem = Product & { selectedColor?: string; quantityInCart: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.selectedColor === item.selectedColor);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.selectedColor === item.selectedColor
            ? { ...i, quantityInCart: i.quantityInCart + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantityInCart: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  return context;
}
