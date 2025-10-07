"use client";

import { useCart } from "../../context/CartContext";

export default function CarrinhoPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) return <p className="p-6">Seu carrinho está vazio.</p>;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantityInCart, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 px-4">
              <p className="font-semibold">{item.name}</p>
              {item.selectedColor && <p>Cor: {item.selectedColor}</p>}
              <p>Preço: {item.price.toLocaleString("pt-AO")} Kz</p>
              <p>Qtd: {item.quantityInCart}</p>
            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: {total.toLocaleString("pt-AO")} Kz</p>
        <button
          onClick={clearCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Limpar Carrinho
        </button>
      </div>
    </div>
  );
}
