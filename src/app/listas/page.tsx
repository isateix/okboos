"use client";

import React from 'react';
import { useCart } from '../../context/CartContext'; // To manage cart items
import Link from 'next/link';
import Image from 'next/image';

export default function ListasPage() {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Meus Itens no Carrinho</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Seu carrinho está vazio.</h2>
          <p className="text-gray-600 mb-6">Adicione produtos para continuar suas compras!</p>
          <Link href="/produtos" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-semibold">
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id + item.selectedColor} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md">
              <div className="flex-shrink-0 w-24 h-24 relative mb-4 sm:mb-0 sm:mr-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                {item.selectedColor && (
                  <p className="text-gray-600 text-sm">Cor: {item.selectedColor}</p>
                )}
                <p className="text-gray-700">Quantidade: {item.quantidade}</p>
                <p className="text-lg font-bold text-gray-800">
                  Preço: {item.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold cursor-pointer"
                >
                  Remover do Carrinho
                </button>
                <Link href="/checkout" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold text-center cursor-pointer">
                  Finalizar Compra
                </Link>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold text-gray-900">Total: {total.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
