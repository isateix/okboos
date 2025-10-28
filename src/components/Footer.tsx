"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-800 shadow-inner">
      {/* Conteúdo principal */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-16 border-b border-gray-200">
        
        {/* Sobre a empresa */}
        <div className="w-4/5">
          <Link href="/">
            <h1 className="text-3xl text-gray-900">
              <span className="font-bold text-orange-500">Ok</span>Boss
            </h1>
          </Link>

          <p className="mt-6 text-base text-gray-700 leading-relaxed">
            {t("companyDescription")}
          </p>
        </div>

        {/* Links úteis */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-lg text-gray-900 mb-5">{t("company")}</h2>
            <ul className="text-base space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-500 transition">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/quem-somos" className="hover:text-orange-500 transition">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-orange-500 transition">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:text-orange-500 transition">
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contactos */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-lg text-gray-900 mb-5">{t("contactUs")}</h2>
            <div className="text-base space-y-2 text-gray-700">
              <p>+244 939 814 478</p>
              <p>okbossgeral@gmail.com</p>
            </div>

            {/* Redes sociais */}
            <section className="flex gap-5 mt-5">
              <a
                href="https://www.facebook.com/share/16QH5teFJj/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#1877F2] transition"
              >
                <Facebook size={36} />
              </a>
              <a
                href="https://wa.me/244939814478"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-500 transition"
              >
                <BsWhatsapp size={36} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-pink-500 transition"
              >
                <Instagram size={36} />
              </a>
              <a
                href="https://www.tiktok.com/@ok.boss00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition"
              >
                <FaTiktok size={36} />
              </a>
            </section>
          </div>
        </div>
      </div>

      {/* Direitos reservados */}
      <p className="py-6 text-center text-sm md:text-base text-gray-500">
        {t("copyright")} 2025 © <span className="text-orange-500 font-semibold">OkBoss</span>. {t("allRightsReserved")}
      </p>
    </footer>
  );
};

export default Footer;
