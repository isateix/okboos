"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function HeroCarousel() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[480px] md:h-[550px] overflow-hidden flex items-center">
      {/* Imagem de fundo maior */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/te.jpg"
          alt={t("hero_image_alt") || "Hero Image"}
          fill
          className="object-cover scale-110"
          priority
        />
      </div>

      {/* Fundo degradê bonito por cima da imagem */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(90deg, rgba(58,46,37,0.85) 0%, rgba(255,255,255,0) 100%)",
        }}
      ></div>

      {/* Conteúdo acima do degradê */}
      <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 h-full">
        {/* Texto à esquerda */}
        <div className="flex-1 max-w-3xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold">
            {t("hero_title") || "A plataforma de e-commerce OkBoss líder no comércio Angolano"}
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            {t("hero_subtitle") || "Conecte seu negócio a fornecedores de confiança e explore milhões de produtos."}
          </p>
        </div>
      </div>
    </section>
  );
}
