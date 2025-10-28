"use client";

import Image from "next/image";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 md:px-20 text-gray-800">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">
          Sobre Nós
        </h1>

        <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
          Somos uma plataforma dedicada a conectar empresas angolanas a fornecedores confiáveis da China e de outras regiões do mundo, 
          promovendo parcerias sólidas e sustentáveis através da tecnologia.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              Nossa Missão
            </h2>
            <p className="text-gray-700 mb-6">
              Facilitar o acesso de empresas angolanas a produtos de qualidade,
              promovendo o crescimento econômico e fortalecendo a presença de Angola no comércio global.
            </p>

            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              Nosso Compromisso
            </h2>
            <p className="text-gray-700 mb-6">
              Transparência, inovação e responsabilidade social. Nosso foco é
              oferecer soluções seguras e eficazes para que cada parceiro alcance o sucesso.
            </p>

            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              Nossos Valores
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Integridade e ética nos negócios</li>
              <li>Parcerias de longo prazo</li>
              <li>Qualidade e eficiência</li>
              <li>Respeito às diferenças culturais</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/sobre.png"
              alt="Equipe trabalhando"
              width={500}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
