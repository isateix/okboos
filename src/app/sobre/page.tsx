"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Sobre() {
  return (
    <>
      <Navbar />

      {/* Body principal com fundo branco ou cinza claro */}
      <main className="pt-24 bg-gray-50 px-6 md:px-16">
        {/* Seção Quem Somos */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12">
          {/* Título à esquerda */}
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-blue-700">Quem Somos</h2>
          </div>

          {/* Texto principal à direita */}
          <div className="md:w-2/3 text-gray-700 text-lg">
            <p>
              A Xinyue Comércio & Serviços se orienta por valores sólidos: compromisso com a excelência, paixão por inovação e foco total na satisfação dos nossos clientes. Trabalhamos diariamente para oferecer produtos de qualidade, experiências confiáveis e atendimento diferenciado.
            </p>
            <p className="mt-4">
              Somos pioneiros em diversas iniciativas locais e nacionais, garantindo que cada cliente tenha acesso aos melhores produtos, serviços e soluções personalizadas.
            </p>
          </div>
        </section>

        {/* Retângulos com conteúdos */}
        <section className="grid md:grid-cols-3 gap-6 py-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Valores</h3>
            <p>Compromisso com a excelência, transparência nas negociações e satisfação do cliente.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Objetivos</h3>
            <p>Facilitar o comércio internacional, garantindo produtos de qualidade com entrega eficiente.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Princípios de Liderança</h3>
            <p>Nossos princípios orientam nossas decisões todos os dias: segurança, inovação, ética e foco no cliente.</p>
          </div>
        </section>

        {/* Seção de imagens */}
        <section className="grid md:grid-cols-2 gap-6 py-12">
          <Image
            src="/images/inportar.jpg"
            alt="Importação"
            width={600}
            height={400}
            className="rounded-lg shadow"
          />
          <Image
            src="/images/entrega.jpg"
            alt="Entrega"
            width={600}
            height={400}
            className="rounded-lg shadow"
          />
        </section>
      </main>

      {/* Apenas um Footer */}
      <Footer />
    </>
  );
}
