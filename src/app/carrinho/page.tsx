"use client";

import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function CarrinhoPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { user } = useUser();
  const { openAuthModal } = useAuth();
  const router = useRouter();

  const handleFinalizePurchase = () => {
    if (!user) {
      openAuthModal();
    } else {
      router.push('/checkout');
    }
  };

  if (cart.length === 0) return <p className="p-6">Seu carrinho está vazio.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 px-4">
              <Link href={`/produtos/${item.id}`}>
                <p className="font-semibold cursor-pointer hover:underline">{item.name}</p>
              </Link>
              {item.selectedColor && <p>Cor: {item.selectedColor}</p>}
              <p>Preço: {item.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
              <p>Qtd: {item.quantidade}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: {total.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Limpar Carrinho
          </button>
          <button
            onClick={handleFinalizePurchase}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
