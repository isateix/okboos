"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#232f3e] text-gray-300">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30">
        
        {/* Sobre a empresa */}
        <div className="w-4/5">
          <Link href="/" legacyBehavior>
            <a>
              <h1 className="text-2xl text-white">
                <span className="font-bold text-orange-600">Ok</span>Boss
              </h1>
            </a>
          </Link>
          <p className="mt-6 text-sm text-gray-300">
            A <span className="font-bold">OkBoss</span> é uma loja online e física. Importamos produtos da China para Angola e estamos localizados na cidade do Século Novo, São Paulo. Oferecemos os melhores produtos com qualidade garantida e preços acessíveis. A sua satisfação é a nossa prioridade!
          </p>
        </div>

        {/* Links úteis */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Empresa</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="hover:underline transition">Início</Link>
              </li>
              <li>
                <Link href="/quem-somos" className="hover:underline transition">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:underline transition">Contacto</Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:underline transition">Política de Privacidade</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contactos */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Fale Connosco</h2>
            <div className="text-sm space-y-2">
              <p>+244 947 965 623</p>
              <p>isateix1996@gmail.com</p>
            </div>

            {/* Redes sociais abaixo dos contactos */}
            <section className="flex gap-4 mt-4">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/share/16QH5teFJj/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-600 transition"
              >
                <Image src="/images/facebook.png" alt="Facebook" width={32} height={32} />
              </a>

              {/* WhatsApp Business */}
              <a 
                href="https://wa.me/244939814478" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-600 transition"
              >
                <Image src="/images/whatsapp.png" alt="WhatsApp" width={32} height={32} />
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-600 transition"
              >
                <Image src="/images/instagram.png" alt="Instagram" width={32} height={32} />
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@ok.boss00" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-600 transition"
              >
                <Image src="/images/tik-tok.png" alt="TikTok" width={32} height={32} />
              </a>
            </section>
          </div>
        </div>
      </div> {/* ✅ FECHOU */}

      {/* Direitos reservados */}
      <p className="py-4 text-center text-xs md:text-sm text-gray-400">
        Copyright 2025 © OkBoss. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
