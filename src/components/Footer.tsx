"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#003D73] text-gray-300 text-sm pt-14 pb-8 mt-8">
      {/* ===== Conteúdo principal ===== */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6 md:px-12 border-b border-[#004a8f] pb-10">
        
        {/* Sobre a empresa */}
        <div>
          <Link href="/">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-[#0071BC]">Ok</span>booss
            </h1>
          </Link>

          <p className="mt-4 text-base leading-relaxed text-gray-300">
            {t("companyDescription")}
          </p>
        </div>

        {/* Links úteis */}
        <div>
          <h2 className="font-semibold text-lg text-white mb-4">
            {t("company")}
          </h2>
          <ul className="text-base space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-[#0071BC] transition"
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/quem-somos"
                className="hover:text-[#0071BC] transition"
              >
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="hover:text-[#0071BC] transition"
              >
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link
                href="/politica-privacidade"
                className="hover:text-[#0071BC] transition"
              >
                {t("privacyPolicy")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contactos e redes sociais */}
        <div>
          <h2 className="font-semibold text-lg text-white mb-4">
            {t("contactUs")}
          </h2>
          <div className="text-base space-y-2 text-gray-300">
            <p>+244 939 814 478</p>
            <p>okbossgeral@gmail.com</p>
          </div>

          <section className="flex gap-5 mt-5">
            <a
              href="https://www.facebook.com/share/16QH5teFJj/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#1877F2] transition"
            >
              <Facebook size={28} />
            </a>
            <a
              href="https://wa.me/244939814478"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-500 transition"
            >
              <BsWhatsapp size={28} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-500 transition"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://www.tiktok.com/@ok.boss00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-black transition"
            >
              <FaTiktok size={28} />
            </a>
          </section>
        </div>
      </div>

      {/* ===== Direitos reservados ===== */}
      <p className="text-center text-xs mt-8 text-gray-400">
        {t("copyright")} 2025 ©{" "}
        <span className="text-[#0071BC] font-semibold">Okbooss</span>.{" "}
        {t("allRightsReserved")}
      </p>
    </footer>
  );
};

export default Footer;
