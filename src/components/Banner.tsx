"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className="
        flex flex-col md:flex-row items-center justify-between 
        md:pl-16 py-6 bg-gradient-to-r from-[#1e293b] to-[#334155] 
        mt-2 mb-20 rounded-2xl overflow-hidden shadow-lg
      "
    >
      {/* Imagem da coluna de som */}
      <Image
        className="max-w-52 md:max-w-60 ml-4 md:ml-10"
        src="/images/jbl_soundbox_image.png"
        alt="Mini coluna portátil JBL"
        width={220}
        height={220}
      />

      {/* Texto e botão */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[300px] text-white">
          Potência que Cabe na Palma da Mão
        </h2>
        <p className="max-w-[340px] font-medium text-gray-300">
          Descubra as novas colunas portáteis — som limpo, graves poderosos e design elegante para levar música a qualquer lugar.
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="group flex items-center justify-center gap-2 px-10 py-2.5 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition"
        >
          Comprar Agora
          <Image
            src="/images/arrow_icon_white.svg"
            alt="Ícone de seta branca"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Imagem do comando (desktop) */}
      <Image
        className="hidden md:block max-w-80 md:mr-10 lg:mr-16"
        src="/images/555.png"
        alt="Comando de videojogo"
        width={340}
        height={340}
      />

      {/* Imagem do comando (mobile) */}
      <Image
        className="md:hidden mt-4"
        src="/images/555.png"
        alt="Comando pequeno"
        width={180}
        height={180}
      />
    </div>
  );
};

export default Banner;
