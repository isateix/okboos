// src/context/CartContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProdutoCarrinho } from "../utils/carrinho";

type CartContextType = {
  cart: ProdutoCarrinho[];
  addToCart: (produto: ProdutoCarrinho) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProdutoCarrinho[]>([]);
  const [total, setTotal] = useState(0);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrinho") || "[]");
    console.log("CartContext: Loading cart from localStorage:", savedCart);
    setCart(savedCart);
  }, []);

  // Atualizar localStorage e total sempre que o cart mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(cart));
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantidade, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (produto: ProdutoCarrinho) => {
    setCart(prev => {
      console.log("CartContext: addToCart - previous cart state:", prev);
      console.log("CartContext: addToCart - product to add:", produto);
      const index = prev.findIndex(p => p.id === produto.id && p.selectedColor === produto.selectedColor);
      console.log("CartContext: addToCart - index found:", index);
      if (index >= 0) {
        const newCart = [...prev];
        newCart[index].quantidade += produto.quantidade;
        console.log("CartContext: addToCart - new cart state (updated existing):", newCart);
        return newCart;
      } else {
        console.log("CartContext: addToCart - new cart state (added new):", [...prev, produto]);
        return [...prev, produto];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};
