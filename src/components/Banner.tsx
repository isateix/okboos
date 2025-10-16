"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-10 bg-[#E6E9F2] mt-6 mb-28 rounded-xl overflow-hidden">
      
      {/* Imagem da coluna de som */}
      <Image
        className="max-w-56"
        src="/images/jbl_soundbox_image.png"
        alt="Coluna de som JBL"
        width={224}
        height={224}
      />

      {/* Texto e botão */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px] text-gray-900">
          Melhore a sua Experiência de Jogo
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/70">
          Desde som imersivo até controlos precisos — tudo o que precisa para vencer.
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="group flex items-center justify-center gap-2 px-12 py-2.5 bg-orange-600 rounded text-white hover:bg-orange-700 transition"
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
  className="hidden md:block max-w-80 md:mr-10 lg:mr-16" // <-- move a imagem para a esquerda
  src="/images/517.png"
  alt="Comando de videojogo"
  width={320}
  height={320}
/>

{/* Imagem do comando (mobile) */}
<Image
  className="md:hidden mt-6"
  src="/images/517.png"
  alt="Comando de videojogo pequeno"
  width={160}
  height={160}
/>
    </div>
  );
};

export default Banner;
