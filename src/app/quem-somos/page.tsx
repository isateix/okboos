"use client";

import Image from "next/image";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";

export default function Sobre() {
  const { t } = useLanguage();

  return (
    <>
      <main className="pt-12 px-6 md:px-16">
        {/* Seção Quem Somos */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-black-700">
              {t("sobre_quem_somos_titulo")}
            </h2>
          </div>

          <div className="md:w-2/3 text-gray-700 text-lg space-y-2">
            <p>{t("sobre_quem_somos_texto1")}</p>
            <p>{t("sobre_quem_somos_texto2")}</p>
            <p>{t("sobre_quem_somos_texto3")}</p>
          </div>
        </section>

        {/* Quadrados com conteúdos */}
        <section className="grid md:grid-cols-3 gap-6 py-12">
          <div className="bg-gray-200 p-6 rounded-lg shadow text-center aspect-square flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              {t("sobre_valores_titulo")}
            </h3>
            <p className="text-gray-700">{t("sobre_valores_texto")}</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow text-center aspect-square flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              {t("sobre_objetivos_titulo")}
            </h3>
            <p className="text-gray-700">{t("sobre_objetivos_texto")}</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow text-center aspect-square flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              {t("sobre_principios_titulo")}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {t("sobre_principios_texto")}
            </p>
          </div>
        </section>

        {/* Seção de imagens */}
        <section className="grid md:grid-cols-3 gap-6 py-12">
          <Image
            src="/images/casa.jpg"
            alt={t("sobre_img1_alt")}
            width={600}
            height={400}
            className="rounded-lg shadow"
          />

          <Image
            src="/images/entrega.jpg"
            alt={t("sobre_img2_alt")}
            width={600}
            height={400}
            className="rounded-lg shadow"
          />

          <Image
            src="/images/8.jpg"
            alt={t("sobre_img3_alt")}
            width={600}
            height={400}
            className="rounded-lg shadow"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
