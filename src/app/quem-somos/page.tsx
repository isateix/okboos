"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function Sobre() {
  return (
    <>
      <Navbar />

      <main className="pt-24 bg-gray-50 px-6 md:px-16">
        
        {/* Seção Quem Somos */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-blue-700">Quem Somos</h2>
          </div>

          <div className="md:w-2/3 text-gray-700 text-lg space-y-4">
            <p>
              A <span className="font-bold">OkBoss</span> é uma loja online e física, especializada em importar produtos da China para Angola. 
            </p>
            <p>
              Estamos localizados na cidade do Século Novo, São Paulo, e oferecemos uma ampla variedade de produtos com qualidade garantida e preços acessíveis.
            </p>
            <p>
              Nosso foco é a satisfação do cliente, garantindo conveniência, diversidade e inovação, trabalhando com ética, responsabilidade e comprometimento.
            </p>
          </div>
        </section>

        {/* Retângulos com conteúdos */}
        <section className="grid md:grid-cols-3 gap-6 py-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Valores</h3>
            <p>Compromisso, ética, transparência e foco total na satisfação do cliente.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Objetivos</h3>
            <p>Garantir produtos de qualidade, entrega eficiente e experiências confiáveis aos nossos clientes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Princípios</h3>
            <p>Segurança, inovação, ética e foco no cliente guiam nossas decisões todos os dias.</p>
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

        {/* Redes sociais */}
        <section className="flex justify-center gap-6 py-12">
          <a href="#" className="text-gray-500 hover:text-orange-600 transition">
            <Image src="/images/facebook_icon.png" alt="Facebook" width={32} height={32} />
          </a>
          <a href="#" className="text-gray-500 hover:text-orange-600 transition">
            <Image src="/images/twitter_icon.png" alt="Twitter" width={32} height={32} />
          </a>
          <a href="#" className="text-gray-500 hover:text-orange-600 transition">
            <Image src="/images/instagram_icon.png" alt="Instagram" width={32} height={32} />
          </a>
        </section>

      </main>

      <Footer />
    </>
  );
}
