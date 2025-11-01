"use client";

import Image from "next/image";
import { produtos } from "../data/products";

export default function Secao8() {
  const idsSelecionados = ["151", "160", "153", "154", "155", "158"];
  const produtosDestaque = idsSelecionados
    .map((id) => produtos.find((p) => p.id === id))
    .filter(Boolean) as typeof produtos;

  const textos: Record<string, { titulo: string; subtitulo: string }> = {
    "151": { titulo: "Ferro de Engomar a Vapor", subtitulo: "Rápido e Prático" },
    "160": { titulo: "Ventilador", subtitulo: "Refresque seu ambiente" },
    "153": { titulo: "Secador", subtitulo: "Prático e Compacto" },
    "154": { titulo: "Shapinha", subtitulo: "Cabelo liso e rápido" },
    "155": { titulo: "Moedor de Pimenta", subtitulo: "Sabor na medida certa" },
    "158": { titulo: "Liquidificador Portátil", subtitulo: "Smoothies e sucos" },
  };

  const moverDireita = ["151", "160", "155", "158"];

  return (
    <section className="pt-16 my-10 p-4 bg-white w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Esquerda */}
        <div className="flex flex-col justify-between gap-6 h-full">
          {[produtosDestaque[0], produtosDestaque[1]].map((produto) => (
            <div
              key={produto.id}
              className="relative bg-[#f6f3f2] rounded-2xl overflow-hidden h-[220px] flex justify-center items-center"
            >
              <Image
                src={produto.image}
                alt={produto.name}
                fill
                className={`object-contain ${moverDireita.includes(produto.id) ? "object-right" : ""}`}
              />
              <div className="absolute top-2 left-2 flex flex-col space-y-1 text-left text-sm md:text-base font-medium text-gray-800 text-center">
                <span>{textos[produto.id].titulo}</span>
                <span>{textos[produto.id].subtitulo}</span>
                <button className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-800 transition w-[100px] text-center font-medium">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Centro */}
        <div className="flex flex-col justify-between gap-6 h-full">
          {[produtosDestaque[2], produtosDestaque[3]].map((produto) => (
            <div
              key={produto.id}
              className="relative bg-[#f6f3f2] rounded-2xl overflow-hidden h-[220px] flex justify-center items-center"
            >
              <Image
                src={produto.image}
                alt={produto.name}
                fill
                className={`object-contain ${moverDireita.includes(produto.id) ? "object-right" : ""}`}
              />
              <div className={`absolute top-2 ${produto.id === "154" ? "right-2 text-right" : "left-2 text-left"} flex flex-col space-y-1 text-sm md:text-base font-medium text-gray-800`}>
                <span>{textos[produto.id].titulo}</span>
                <span>{textos[produto.id].subtitulo}</span>
                <button className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-800 transition w-[100px] text-center font-medium">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direita */}
        <div className="flex flex-col justify-between gap-6 h-full">
          {[produtosDestaque[4], produtosDestaque[5]].map((produto) => (
            <div
              key={produto.id}
              className="relative bg-[#f6f3f2] rounded-2xl overflow-hidden h-[220px] flex justify-center items-center"
            >
              <Image
                src={produto.image}
                alt={produto.name}
                fill
                className={`object-contain ${moverDireita.includes(produto.id) ? "object-right" : ""}`}
              />
              <div className="absolute top-2 left-2 flex flex-col space-y-1 text-left text-sm md:text-base font-medium text-gray-800 text-center">
                <span>{textos[produto.id].titulo}</span>
                <span>{textos[produto.id].subtitulo}</span>
                <button className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-800 transition w-[100px] text-center font-medium">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
