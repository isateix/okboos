"use client";

import Image from "next/image";
import { produtos } from "../data/products";

export default function Secao12() {
  const idsSelecionados = ["73", "72", "74", "75", "76"];
  const produtosDestaque = idsSelecionados
    .map((id) => produtos.find((p) => p.id === id))
    .filter(Boolean) as typeof produtos;

  return (
    <section className="mt-16 mb-8 p-6 bg-white w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 h-[580px]">

        {/* Esquerda - 73 */}
        <div className="relative rounded-2xl overflow-hidden bg-yellow-100 flex flex-col justify-between items-center p-4">
          <div className="relative w-full h-[85%] flex justify-center items-center">
            <Image
              src={produtosDestaque[0].image}
              alt={produtosDestaque[0].name}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-2xl text-blue-900 font-semibold">{produtosDestaque[0].name}</h2>
            <button className="mt-2 bg-white text-blue-900 text-sm px-4 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition">
              Ver mais
            </button>
          </div>
        </div>

        {/* Centro */}
        <div className="flex flex-col gap-6">

          {/* Cima - 72 */}
          <div className="relative bg-yellow-100 rounded-2xl overflow-hidden flex flex-col items-center justify-between p-4 h-[280px]">
            <div className="relative w-full h-[75%] flex justify-center items-center">
              <Image
                src={produtosDestaque[1].image}
                alt={produtosDestaque[1].name}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="text-xl text-blue-900 font-semibold">{produtosDestaque[1].name}</h2>
              <button className="mt-1 bg-white text-blue-900 text-sm px-3 py-1 rounded-md shadow-sm hover:bg-blue-50 transition">
                Comprar agora
              </button>
            </div>
          </div>

          {/* Baixo - 74 e 75 */}
          <div className="grid grid-cols-2 gap-6 h-[280px]">
            {produtosDestaque.slice(2, 4).map((produto) => (
              <div key={produto.id} className="relative bg-yellow-100 rounded-2xl overflow-hidden flex flex-col justify-between items-center p-4">
                <div className="relative w-full h-[70%] flex justify-center items-center">
                  <Image
                    src={produto.image}
                    alt={produto.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center mt-2">
                  <h3 className="text-blue-900 text-lg font-medium">{produto.name}</h3>
                  <button className="mt-1 bg-white text-blue-900 text-xs px-3 py-1 rounded-md shadow-sm hover:bg-blue-50 transition">
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direita - 76 */}
        <div className="relative rounded-2xl overflow-hidden bg-yellow-100 flex flex-col justify-between items-center p-4">
          <div className="relative w-full h-[85%] flex justify-center items-center">
            <Image
              src={produtosDestaque[4].image}
              alt={produtosDestaque[4].name}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-2xl text-blue-900 font-semibold">{produtosDestaque[4].name}</h2>
            <button className="mt-2 bg-white text-blue-900 text-sm px-4 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition">
              Comprar agora
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
