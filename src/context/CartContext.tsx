// src/context/CartContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProdutoCarrinho } from "../utils/carrinho";

type CartContextType = {
  cart: ProdutoCarrinho[];
  addToCart: (produto: ProdutoCarrinho) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProdutoCarrinho[]>([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCart(savedCart);
  }, []);

  // Atualizar localStorage sempre que o cart mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (produto: ProdutoCarrinho) => {
    setCart(prev => {
      const index = prev.findIndex(p => p.id === produto.id);
      if (index >= 0) {
        const newCart = [...prev];
        newCart[index].quantidade += produto.quantidade;
        return newCart;
      } else {
        return [...prev, produto];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};
