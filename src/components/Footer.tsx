"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#4B0082] text-white"> {/* 💜 Lilás escuro */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-white/20">
        
        {/* Sobre a empresa */}
        <div className="w-4/5">
          <Link href="/">
            <h1 className="text-2xl text-white">
              <span className="font-bold text-orange-500">Ok</span>Boss
            </h1>
          </Link>

          <p className="mt-6 text-sm text-gray-100 leading-relaxed">
            A <span className="font-bold">OkBoss</span> é uma loja online e física. 
            Importamos todo tipo de produtos da China para Angola, 
            estamos localizados na Cidade do Século, Novo São Paulo. 
            Oferecemos os melhores produtos com qualidade garantida e preços acessíveis. 
            A sua satisfação é a nossa prioridade!
          </p>
        </div>

        {/* Links úteis */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Empresa</h2>
            <ul className="text-sm space-y-2">
              <li><Link href="/" className="hover:text-orange-400 transition">Início</Link></li>
              <li><Link href="/quem-somos" className="hover:text-orange-400 transition">Sobre Nós</Link></li>
              <li><Link href="/contacto" className="hover:text-orange-400 transition">Contacto</Link></li>
              <li><Link href="/politica-privacidade" className="hover:text-orange-400 transition">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        {/* Contactos */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Fale Connosco</h2>
            <div className="text-sm space-y-2">
              <p>+244 939 814 478</p>
              <p>geralokboss@gmail.com</p>
            </div>

            {/* Redes sociais (cores lilás e branco) */}
            <section className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/share/16QH5teFJj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-200 transition">
                <Facebook size={32} />
              </a>
              <a href="https://wa.me/244939814478" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-300 transition">
                <BsWhatsapp size={32} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition">
                <Instagram size={32} />
              </a>
              <a href="https://www.tiktok.com/@ok.boss00" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                <FaTiktok size={32} />
              </a>
            </section>
          </div>
        </div>
      </div>

      {/* Direitos reservados */}
      <p className="py-4 text-center text-xs md:text-sm text-gray-200">
        Copyright 2025 © OkBoss. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
