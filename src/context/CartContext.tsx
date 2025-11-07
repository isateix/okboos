"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ✅ Tipo de produto no carrinho
export type ProdutoCarrinho = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantidade: number;
  selectedColor?: string;
};

type CartContextType = {
  cart: ProdutoCarrinho[];
  addToCart: (produto: ProdutoCarrinho) => void;
  removeFromCart: (id: string, selectedColor?: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, selectedColor: string | undefined, newQtd: number) => void; // ✅ ADICIONADO
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProdutoCarrinho[]>([]);
  const [total, setTotal] = useState(0);

  // ✅ Carregar do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("carrinho") || "[]");
      setCart(savedCart);
    }
  }, []);

  // ✅ Salvar no localStorage e atualizar total
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("carrinho", JSON.stringify(cart));
    }
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantidade, 0);
    setTotal(newTotal);
  }, [cart]);

  // ✅ Adicionar produto ao carrinho
  const addToCart = (produto: ProdutoCarrinho) => {
    setCart(prev => {
      const index = prev.findIndex(
        p => p.id === produto.id && (p.selectedColor || "") === (produto.selectedColor || "")
      );

      if (index >= 0) {
        const newCart = [...prev];
        newCart[index].quantidade += produto.quantidade;
        return newCart;
      } else {
        return [...prev, produto];
      }
    });
  };

  // ✅ Remover produto
  const removeFromCart = (id: string, selectedColor?: string) => {
    setCart(prev =>
      prev.filter(p => {
        const pColor = p.selectedColor || "";
        const color = selectedColor || "";
        return !(p.id === id && pColor === color);
      })
    );
  };

  // ✅ Limpar carrinho
  const clearCart = () => setCart([]);

  // ✅ Atualizar quantidade (+ / -)
  const updateQuantity = (id: string, selectedColor: string | undefined, newQtd: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedColor === selectedColor
          ? { ...item, quantidade: Math.max(1, newQtd) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook para consumir o carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};
