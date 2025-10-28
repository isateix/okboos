"use client";

import Image from "next/image";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { FaBookOpen, FaShoppingCart, FaCog, FaPhone } from "react-icons/fa";

export default function SobrePage() {
  return (
    <>
      <main className="pt-24 px-6 md:px-16 bg-gray-50 min-h-screen flex flex-col items-center">

        {/* Cabeçalho */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Impulsionando Negócios com a OkBoss
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            A <span className="font-semibold text-gray-900">OkBoss.com</span> conecta pequenas e médias empresas
            em Angola e no mundo, oferecendo soluções completas de importação, comércio internacional e serviços de suporte empresarial.
            Tornamos o processo mais rápido, seguro e inteligente, permitindo que o seu negócio cresça além das fronteiras.
          </p>
        </motion.section>

        {/* Imagem principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-5xl mb-16 relative rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/parceria.png"
            alt="Empresas conectadas pela OkBoss"
            width={1200}
            height={600}
            className="object-cover w-full h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">
              Conectando Angola ao mundo com tecnologia, confiança e oportunidades reais
            </h2>
          </div>
        </motion.div>

        {/* Seção Sobre Nós */}
        <section id="sobre-nos" className="max-w-5xl w-full mb-20">
          <h2 className="text-3xl font-bold text-orange-600 mb-8 flex items-center gap-2"><FaBookOpen /> Sobre Nós</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">O que é o site</h3>
              <p>
                OkBoss é uma plataforma que conecta empresas e compradores em Angola e no exterior.
                Oferecemos soluções inteligentes para importar produtos, gerenciar pedidos e acessar fornecedores confiáveis.
                Tudo em um único lugar para facilitar seu crescimento.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Por que escolher-nos</h3>
              <p>
                Diferenciais da OkBoss: segurança total nas transações, suporte dedicado, processos simplificados e
                uma rede de fornecedores verificados. Garantimos confiança e transparência em cada etapa do comércio internacional.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Planos e assinaturas</h3>
              <p>
                Escolha entre planos gratuitos ou premium com benefícios como acesso a fornecedores exclusivos,
                suporte prioritário e ferramentas avançadas para acompanhar e gerenciar seus pedidos de forma eficiente.
              </p>
            </div>
          </div>
        </section>

        {/* Seção Compras e Serviços */}
        <section id="compras-servicos" className="max-w-5xl w-full mb-20">
          <h2 className="text-3xl font-bold text-orange-600 mb-8 flex items-center gap-2"><FaShoppingCart /> Compras e Serviços</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Como comprar</h3>
              <p>
                Um guia passo a passo mostra como encontrar fornecedores confiáveis, negociar preços, efetuar pedidos
                e acompanhar entregas com total transparência.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Serviços disponíveis</h3>
              <p>
                Além da importação, oferecemos logística completa, inspeção de produtos antes do envio e
                assistência personalizada em todos os processos de comércio internacional.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Proteções ao comprador</h3>
              <p>
                Todas as compras são protegidas por garantias de pagamento, políticas de devolução e seguros,
                garantindo que você compre com segurança e tranquilidade.
              </p>
            </div>
          </div>
        </section>

        {/* Seção Finanças e Garantias */}
        <section id="financas-garantias" className="max-w-5xl w-full mb-20">
          <h2 className="text-3xl font-bold text-orange-600 mb-8 flex items-center gap-2"><FaCog /> Finanças e Garantias</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Crédito fácil</h3>
              <p>
                Oferecemos opções de crédito flexíveis para compradores e fornecedores, permitindo mais facilidade
                na negociação e crescimento sustentável dos negócios.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Serviço de inspeção</h3>
              <p>
                Garantimos que produtos e fornecedores atendem a padrões rigorosos de qualidade antes do envio,
                reduzindo riscos e aumentando a confiança nas transações.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Conformidade fiscal</h3>
              <p>
                Orientamos empresas sobre regulamentações fiscais e legais de importação/exportação,
                assegurando que todas as operações estejam em total conformidade.
              </p>
            </div>
          </div>
        </section>

        {/* Seção Recursos e Ajuda */}
        <section id="recursos-ajuda" className="max-w-5xl w-full mb-20">
          <h2 className="text-3xl font-bold text-orange-600 mb-8 flex items-center gap-2"><FaPhone /> Recursos e Ajuda</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Blog e dicas</h3>
              <p>
                Conteúdos educativos com tutoriais, artigos e dicas estratégicas para importar, gerir e expandir negócios internacionais.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Histórias de sucesso</h3>
              <p>
                Inspiradoras experiências de clientes e empresas que alcançaram resultados significativos com o suporte da OkBoss.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Atendimento</h3>
              <p>
                Suporte direto e personalizado via chat, e-mail ou telefone, pronto para resolver dúvidas e auxiliar em todas as etapas.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-action final */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Encontre fornecedores por toda a China e região
          </h3>
          <a
            href="/fornecedor/atendimento-fornecedor"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-500 transition"
          >
            Começar Agora
          </a>
        </motion.section>

      </main>

      <Footer />
    </>
  );
}
