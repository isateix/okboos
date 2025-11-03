"use client";

import Image from "next/image";
import { products, Product } from "../data/products"; // ✅ Caminho mantido

export default function Secao16() {
  const idsSelecionados = ["44", "45", "46"];
  const produtosDestaque = idsSelecionados
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <section className="mt-12 mb-6 p-4 bg-white w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produtosDestaque.map((produto, index) => (
          <div
            key={produto.id}
            className="relative rounded-2xl overflow-hidden bg-white p-8 flex flex-col justify-between text-center h-[460px] shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* Título e subtítulo */}
            <div>
              <h2 className="text-2xl text-blue-900 font-semibold leading-tight">
                {produto.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                {index === 0
                  ? "tudo o que você precisa"
                  : index === 1
                  ? "aquece e facilita o seu dia"
                  : "praticidade e eficiência"}
              </p>
            </div>

            {/* Imagem central */}
            <div className="flex justify-center items-center flex-1 mt-6 mb-4 relative">
              <div className="relative w-[260px] h-[260px] transition-transform duration-300 hover:scale-110">
                <Image
                  src={produto.image}
                  alt={produto.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* ✅ Botão do card do meio — descido mais um pouco */}
              {index === 1 && (
                <button
                  className="absolute bottom-0 bg-blue-900 text-white text-sm px-6 py-2 rounded-md shadow-md hover:bg-blue-800 transition font-medium"
                  style={{ transform: "translateY(45%)" }}
                >
                  Comprar agora
                </button>
              )}
            </div>

            {/* Botão normal para os outros cards */}
            {index !== 1 && (
              <button className="bg-blue-900 text-white text-sm px-6 py-2 rounded-md shadow-md hover:bg-blue-800 transition font-medium mx-auto">
                Comprar agora
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
