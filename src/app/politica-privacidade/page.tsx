"use client";

import React from "react";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";

export default function PoliticaPrivacidadePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Conteúdo principal */}
      <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg my-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          {t("privacidade_titulo")}
        </h1>

        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("privacidade_paragrafo1_parte1")}{" "}
            <span className="font-semibold text-orange-600">OkBoss</span>{" "}
            {t("privacidade_paragrafo1_parte2")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            {t("privacidade_paragrafo2")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            {t("privacidade_paragrafo3")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            <span className="font-semibold text-orange-600">OkBoss</span>{" "}
            {t("privacidade_paragrafo4")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            {t("privacidade_paragrafo5")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            {t("privacidade_paragrafo6")} <br />
            <span className="font-semibold text-orange-600">
              geralokboos@gmail.com
            </span>
          </p>

          <p className="text-gray-600 leading-relaxed">
            {t("privacidade_paragrafo7")}
          </p>
        </section>
      </div>

      {/* Footer global */}
      <Footer />
    </>
  );
}
