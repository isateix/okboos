"use client";

import Image from "next/image";

export default function Sobre() {
  return (
    <>
      {/* NAV exclusiva da página Quem Somos */}
      <nav className="w-full bg-[#232f3e] text-white px-6 md:px-16 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold text-orange-600">OkBoss</span>
          <span className="text-sm text-gray-300">Comércio e Serviços</span>
        </div>

        {/* Links + pesquisa */}
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-orange-500 transition">
            Início
          </a>
          <a href="/produtos" className="hover:text-orange-500 transition">
            Produtos
          </a>

          {/* Aba de pesquisa */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="text-sm pl-10 pr-3 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
            />
            {/* Ícone de lupa */}
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="pt-12 px-6 md:px-16">
        {/* Seção Quem Somos */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-black-700">Quem Somos</h2>
          </div>

          <div className="md:w-2/3 text-gray-700 text-lg space-y-2">
            <p>
              A <span className="font-bold">OkBoss</span> é uma loja online e
              física, especializada em importar produtos da China para Angola.
            </p>
            <p>
              Estamos localizados na cidade do Século Novo, São Paulo, e
              oferecemos uma ampla variedade de produtos com qualidade garantida
              e preços acessíveis.
            </p>
            <p>
              Nosso foco é a satisfação do cliente, garantindo conveniência,
              diversidade e inovação, trabalhando com ética, responsabilidade e
              comprometimento.
            </p>
          </div>
        </section>

        {/* Quadrados com conteúdos */}
        <section className="grid md:grid-cols-3 gap-6 py-12">
          <div className="bg-gray-200 p-6 rounded-lg shadow text-center aspect-square flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              Valores
            </h3>
            <p className="text-gray-700">
              Compromisso, ética, transparência e foco total na satisfação do
              cliente. Buscamos sempre agir com respeito, integridade e
              responsabilidade em todas as relações, sejam com clientes,
              parceiros ou colaboradores. Nossos valores refletem a essência da
              OkBoss e orientam cada decisão que tomamos.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow text-center aspect-square flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              Objetivos
            </h3>
            <p className="text-gray-700">
              Garantir produtos de qualidade, entrega eficiente e experiências
              confiáveis aos nossos clientes. Nosso objetivo é ser referência em
              importação e comércio em Angola, unindo preço justo, inovação e
              atendimento de excelência. Trabalhamos diariamente para superar as
              expectativas e fortalecer nossa marca no mercado.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow text-center aspect-square flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              Princípios
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Na OkBoss, inspiramo-nos em práticas globais de liderança. Assim
              como grandes empresas, acreditamos que todos são responsáveis por
              demonstrar liderança e colocar o cliente no centro das decisões.
              Valorizamos a <span className="font-bold">obsessão pelo cliente</span>,
              a <span className="font-bold">mentalidade de dono</span>, a{" "}
              <span className="font-bold">inovação</span> e a busca pelos{" "}
              <span className="font-bold">mais altos padrões</span>.
              <br />
              Incentivamos a <span className="font-bold">curiosidade</span> e o
              aprendizado contínuo, formamos líderes e estimulamos a{" "}
              <span className="font-bold">frugalidade</span> — fazer mais com
              menos. Nossos princípios também incluem pensar grande, ter
              iniciativa e sempre entregar resultados consistentes, com
              compromisso ético e social.
            </p>
          </div>
        </section>
{/* Seção de imagens - todas iguais */}
<section className="grid md:grid-cols-3 gap-6 py-12">
  <Image
    src="/images/6.jpg"
    alt="Importação"
    width={600}
    height={400}
    className="rounded-lg shadow"
  />

  <Image
    src="/images/5.jpg"
    alt="Entrega"
    width={600}
    height={400}
    className="rounded-lg shadow"
  />

  <Image
    src="/images/8.jpg"
    alt="Nossa Loja"
    width={600}
    height={400}
    className="rounded-lg shadow"
  />
</section>

      </main>
    </>
  );
}
