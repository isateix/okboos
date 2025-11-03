"use client";

import Image from "next/image";
import { products, Product } from "../data/products";

export default function Secao12() {
  const idsSelecionados = ["73", "72", "74", "75", "76"];
  const produtosDestaque = idsSelecionados
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <section className="pt-12 md:pt-16 mb-6 p-4 sm:p-6 bg-white w-full">
      <div
        className="
          max-w-7xl mx-auto 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4
        "
      >
        {/* Esquerda - 73 */}
        <div className="relative rounded-xl overflow-hidden bg-yellow-100 flex flex-col justify-between items-center p-4 sm:p-5 lg:p-4 h-[420px]">
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="relative w-full h-64 sm:h-72 lg:h-64 flex justify-center items-center">
              <Image
                src={produtosDestaque[0].image}
                alt={produtosDestaque[0].name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="text-center mt-4 mb-2">
            <h2 className="text-lg sm:text-xl text-blue-900 font-semibold">
              {produtosDestaque[0].name}
            </h2>
            <button className="mt-2 bg-white text-blue-900 text-sm sm:text-base px-4 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition">
              Ver mais
            </button>
          </div>
        </div>

        {/* Centro */}
        <div className="flex flex-col gap-4">
          {/* Cima - 72 */}
          <div className="relative bg-yellow-100 rounded-xl overflow-hidden flex flex-col justify-between items-center p-3 sm:p-4 lg:p-3 h-[280px]">
            <div className="flex-1 flex justify-center items-center w-full">
              <div className="relative w-full h-44 sm:h-52 lg:h-44">
                <Image
                  src={produtosDestaque[1].image}
                  alt={produtosDestaque[1].name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-center mt-3 mb-2">
              <h2 className="text-sm sm:text-base text-blue-900 font-semibold">
                {produtosDestaque[1].name}
              </h2>
              <button className="mt-1 bg-white text-blue-900 text-xs sm:text-sm px-3 py-1 rounded-md shadow-sm hover:bg-blue-50 transition">
                Comprar 
              </button>
            </div>
          </div>
{/* Baixo - 74 e 75 */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {produtosDestaque.slice(2, 4).map((produto) => (
    <div
      key={produto.id}
      className="relative bg-yellow-100 rounded-xl overflow-hidden flex flex-col justify-between items-center p-3 sm:p-4 lg:p-3 h-[260px]"
    >
      {/* Subimos a imagem levemente */}
      <div className="flex-1 flex justify-center items-center w-full -mt-2">
        <div className="relative w-full h-42 sm:h-46 lg:h-42">
          <Image
            src={produto.image}
            alt={produto.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Subimos um pouco o texto e o botão */}
      <div className="text-center mt-1 mb-2">
        <h3 className="text-blue-900 text-sm sm:text-base font-medium">
          {produto.name}
        </h3>
        <button className="mt-1 bg-white text-blue-900 text-xs sm:text-sm px-3 py-1 rounded-md shadow-sm hover:bg-blue-50 transition">
          Comprar
        </button>
      </div>
    </div>
  ))}
</div>

        </div>

        {/* Direita - 76 */}
        <div className="relative rounded-xl overflow-hidden bg-yellow-100 flex flex-col justify-between items-center p-4 sm:p-5 lg:p-4 h-[420px]">
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="relative w-full h-64 sm:h-72 lg:h-64 flex justify-center items-center">
              <Image
                src={produtosDestaque[4].image}
                alt={produtosDestaque[4].name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="text-center mt-4 mb-2">
            <h2 className="text-lg sm:text-xl text-blue-900 font-semibold">
              {produtosDestaque[4].name}
            </h2>
            <button className="mt-2 bg-white text-blue-900 text-sm sm:text-base px-4 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
