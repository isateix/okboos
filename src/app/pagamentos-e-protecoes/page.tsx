"use client";

import Image from "next/image";
import Footer from "../../components/Footer";

export default function PagamentosProtecoes() {
  return (
    <>
      <main className="pt-24 px-6 md:px-16 bg-gray-50 min-h-screen flex flex-col items-center">

        <section className="max-w-5xl text-center mb-20">
          <h1 className="text-4xl font-bold text-orange-600 mb-6">Pagamentos, Logística e Proteções</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Na <span className="font-semibold text-gray-900">OkBoss.com</span>, garantimos que suas compras internacionais sejam seguras, rápidas e transparentes.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mb-20">

          {/* Pagamentos seguros */}
          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <span className="text-5xl mb-4">💰</span>
            <h3 className="text-2xl font-semibold mb-2">Pagamentos seguros e fáceis</h3>
            <p className="text-gray-700 leading-relaxed">
              Seus pagamentos são protegidos por sistemas internacionais confiáveis, garantindo total segurança e praticidade nas transações.
            </p>
          </div>

          {/* Política de reembolso */}
          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <span className="text-5xl mb-4">🔄</span>
            <h3 className="text-2xl font-semibold mb-2">Política de reembolso</h3>
            <p className="text-gray-700 leading-relaxed">
              Caso algo saia diferente do combinado, você receberá seu dinheiro de volta, garantindo tranquilidade em cada compra.
            </p>
          </div>

          {/* Transporte e logística */}
          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <span className="text-5xl mb-4">🚚</span>
            <h3 className="text-2xl font-semibold mb-2">Serviços de transporte e logística</h3>
            <p className="text-gray-700 leading-relaxed">
              Oferecemos opções confiáveis de envio internacional, com rastreamento e acompanhamento do seu pedido em tempo real.
            </p>
          </div>

          {/* Proteções pós-venda */}
          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <span className="text-5xl mb-4">🛡️</span>
            <h3 className="text-2xl font-semibold mb-2">Proteções pós-venda</h3>
            <p className="text-gray-700 leading-relaxed">
              Nossa assistência pós-entrega garante que você esteja totalmente satisfeito com sua compra, oferecendo suporte imediato caso necessário.
            </p>
          </div>

        </div>

        <section className="text-center mb-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Quer saber mais? Entre em contato com nosso time de suporte.
          </h3>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition"
          >
            Fale com o Suporte
          </a>
        </section>

      </main>

      <Footer />
    </>
  );
}
