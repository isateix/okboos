// src/components/Hero.tsx
"use client";

import { PlayCircle } from "lucide-react";
import FloatingDots from "./FloatingDots";

export default function Hero({ imageSrc = "/images/hero.jpg" }: { imageSrc?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      {/* Bolinhas animadas */}
      <FloatingDots />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12">
        {/* Imagem - primeiro no mobile, à direita no desktop */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={imageSrc}
            alt="OkBoss - hero"
            className="w-full max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Texto - sempre centralizado */}
        <div className="md:w-1/2 flex flex-col items-center text-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            A <span className="text-blue-600">OkBoss</span> leva o teu negócio mais longe!
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
            Aqui encontras <strong>produtos de confiança</strong> para o dia a dia e para a tua empresa.
            Aproveita <span className="text-blue-600 font-semibold">descontos especiais 💸 até 50%</span> em compras
            e beneficia de <span className="font-semibold">entrega grátis 🚚</span> em pedidos selecionados.
          </p>

          {/* Botão */}
          <a
            href="https://www.youtube.com/watch?v=VIDEO_ID"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-medium"
          >
            <PlayCircle size={24} /> Como funciona
          </a>

          {/* Métricas */}
          <div className="mt-6 flex gap-4 justify-center">
            <div className="text-center p-4 rounded-lg bg-white shadow-md w-28">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Produtos</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-white shadow-md w-28">
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-sm text-gray-600">Clientes</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-white shadow-md w-28">
              <div className="text-3xl font-bold text-pink-600">24/7</div>
              <div className="text-sm text-gray-600">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
