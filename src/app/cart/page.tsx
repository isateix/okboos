"use client";

import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CarrinhoPage() {
  const { cart, removeFromCart, clearCart, total, updateQuantity } = useCart(); // ✅ adicionamos updateQuantity
  const { user } = useUser();
  const { openAuthModal } = useAuth();
  const router = useRouter();

  const handleFinalizePurchase = () => {
    if (!user) {
      openAuthModal();
    } else {
      router.push("/checkout");
    }
  };

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-[#0071BC] mb-3">🛒 Carrinho vazio</h2>
        <p className="text-gray-600 mb-6">
          Você não tem itens no seu carrinho de compras.
        </p>
        <Link
          href="/"
          className="bg-[#0071BC] text-white px-6 py-3 rounded-full hover:bg-[#005fa3] transition font-semibold"
        >
          Continuar as compras
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      
      {/* ===== CABEÇALHO ===== */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-bold text-lg">
              O
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0071BC]">
              Okbooss
            </span>
          </div>
        </div>
      </header>

      {/* ===== CONTEÚDO DO CARRINHO ===== */}
      <main className="flex-1 max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#0071BC]">Seu Carrinho</h1>

        <div className="flex flex-col gap-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1 px-4">
                <Link href={`/produtos/${item.id}`}>
                  <p className="font-semibold cursor-pointer hover:underline text-[#0071BC]">
                    {item.name}
                  </p>
                </Link>

                {item.selectedColor && <p>Cor: {item.selectedColor}</p>}

                <p className="mt-1">
                  {item.price.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </p>

                {/* ✅ CONTROLE DE QUANTIDADE */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedColor, item.quantidade - 1)
                    }
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-lg"
                  >
                    -
                  </button>

                  <span className="font-semibold text-lg">{item.quantidade}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedColor, item.quantidade + 1)
                    }
                    className="px-3 py-1 bg-[#0071BC] hover:bg-[#005fa3] text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ✅ Botão remover */}
              <button
                onClick={() => removeFromCart(item.id, item.selectedColor)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL E AÇÕES */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xl font-bold text-[#0071BC]">
            Total:{" "}
            {total.toLocaleString("pt-AO", {
              style: "currency",
              currency: "AOA",
            })}
          </p>

          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
            >
              Limpar Carrinho
            </button>

            <button
              onClick={handleFinalizePurchase}
              className="bg-[#0071BC] text-white px-5 py-2 rounded-full hover:bg-[#005fa3] transition"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
