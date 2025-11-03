"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "../data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Secao20() {
  const banners = [
    {
      id: 1,
      title: "Produtos em Destaque",
      color: "bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-400",
      images: [products.find((p) => p.id === "151"), products.find((p) => p.id === "158")],
    },
    {
      id: 2,
      title: "Calçados em Promoção",
      color: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-400",
      images: products.filter((p) =>
        ["60", "61", "62", "63", "64", "65", "66", "67", "68", "44"].includes(p.id)
      ),
    },
    {
      id: 3,
      title: "Tigelas de Taque Wey",
      color: "bg-gradient-to-r from-pink-100 via-pink-200 to-pink-400",
      images: products.filter((p) => ["162", "163"].includes(p.id)),
    },
    {
      id: 4,
      title: "Rolos & Fitas Adesivas",
      color: "bg-gradient-to-r from-green-100 via-green-200 to-green-400",
      images: products.filter((p) => ["161", "44", "45"].includes(p.id)),
    },
    {
      id: 5,
      title: "Eletrodomésticos Essenciais",
      color: "bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400",
      images: products.filter((p) => ["11", "12", "13", "14", "15"].includes(p.id)),
    },
  ];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 300);
  };

  const prevBanner = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  const banner = banners[current];

  return (
    <section
      className={`relative w-full py-10 sm:py-14 md:py-16 mt-36 overflow-hidden transition-all duration-700 ${banner.color}`}
    >
      {/* Conteúdo com efeito fade */}
      <div
        className={`transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        } flex flex-col items-center justify-center`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-md text-center">
          {banner.title}
        </h2>

        {/* Container das imagens */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-8">
          {banner.images.map(
            (item) =>
              item && (
                <div
                  key={item.id}
                  className="relative w-[150px] sm:w-[180px] md:w-[220px] h-[150px] sm:h-[180px] md:h-[220px] rounded-2xl overflow-hidden hover:scale-110 transition-transform duration-300 shadow-xl"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              )
          )}
        </div>
      </div>

      {/* Setas modernas */}
      <button
        onClick={prevBanner}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-full p-3 sm:p-4 shadow-lg transition-all border border-gray-300 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" />
      </button>

      <button
        onClick={nextBanner}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-full p-3 sm:p-4 shadow-lg transition-all border border-gray-300 hover:scale-110"
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-gray-800 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
