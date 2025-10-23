"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Secao5() {
  const { locale } = useLanguage();

  const translations = {
    pt: {
      titulo:
        "Acesse benefícios, serviços e ferramentas criadas para o sucesso do seu negócio.",
      descricao:
        "Impulsione o crescimento da sua empresa com as vantagens da OkBoss — conecte-se a fornecedores confiáveis e descubra oportunidades únicas no comércio internacional.",
      testemunhos: [
        {
          nome: "Mariana Costa",
          cargo: "Fundadora da Lumina Cosméticos",
          texto:
            "Como empreendedora no setor de beleza, encontrei na OkBoss uma plataforma confiável para importar matérias-primas com qualidade. A parceria facilitou muito o crescimento do meu negócio.",
          imagem: "/images/te1.jpg",
        },
        {
          nome: "Carlos Andrade",
          cargo: "CEO da TechNova Solutions",
          texto:
            "Com a OkBoss, consegui conectar minha empresa a fornecedores internacionais de confiança. O processo de importação ficou muito mais simples e seguro.",
          imagem: "/images/te2.jpg",
        },
        {
          nome: "Luís Pereira e Ana Martins",
          cargo: "Fundadores da FitLife Angola",
          texto:
            "A OkBoss ajudou-nos a encontrar equipamentos de ginásio com ótimo custo-benefício. Hoje conseguimos atender mais clientes e expandir nossa marca em Angola.",
          imagem: "/images/te3.jpg",
        },
      ],
    },

    en: {
      titulo:
        "Access benefits, services, and tools designed for your business success.",
      descricao:
        "Boost your company's growth with OkBoss advantages — connect with trusted suppliers and discover unique opportunities in international trade.",
      testemunhos: [
        {
          nome: "Mariana Costa",
          cargo: "Founder of Lumina Cosmetics",
          texto:
            "As an entrepreneur in the beauty sector, I found OkBoss to be a reliable platform for importing quality raw materials. This partnership made my business growth much easier.",
          imagem: "/images/te1.jpg",
        },
        {
          nome: "Carlos Andrade",
          cargo: "CEO of TechNova Solutions",
          texto:
            "With OkBoss, I was able to connect my company with trustworthy international suppliers. The import process became much simpler and safer.",
          imagem: "/images/te2.jpg",
        },
        {
          nome: "Luís Pereira & Ana Martins",
          cargo: "Founders of FitLife Angola",
          texto:
            "OkBoss helped us find gym equipment with excellent cost-effectiveness. Today we serve more clients and have expanded our brand in Angola.",
          imagem: "/images/te3.jpg",
        },
      ],
    },

    cn: {
      titulo: "获取为您的业务成功打造的专属服务与工具。",
      descricao:
        "通过 OkBoss 的优势助力您的企业成长——与值得信赖的供应商建立联系，探索国际贸易中的独特机遇。",
      testemunhos: [
        {
          nome: "玛丽安娜·科斯塔",
          cargo: "Lumina 化妆品创始人",
          texto:
            "作为美容行业的创业者，我发现 OkBoss 是一个可靠的平台，可以进口高质量的原材料。这种合作极大地促进了我的业务增长。",
          imagem: "/images/te1.jpg",
        },
        {
          nome: "卡洛斯·安德拉德",
          cargo: "TechNova 解决方案公司 CEO",
          texto:
            "通过 OkBoss，我的公司能够与全球值得信赖的供应商建立联系。进口流程变得更加简单和安全。",
          imagem: "/images/te2.jpg",
        },
        {
          nome: "路易斯·佩雷拉 与 安娜·马丁斯",
          cargo: "FitLife 安哥拉联合创始人",
          texto:
            "OkBoss 帮助我们找到性价比极高的健身设备。如今我们能够服务更多客户，并在安哥拉扩大了品牌影响力。",
          imagem: "/images/te3.jpg",
        },
      ],
    },
  };

  const { titulo, descricao, testemunhos } = translations[locale];
  const [index, setIndex] = useState(0);

  const nextTestemunho = () => {
    setIndex((prev) => (prev + 1) % testemunhos.length);
  };

  const prevTestemunho = () => {
    setIndex((prev) => (prev - 1 + testemunhos.length) % testemunhos.length);
  };

  return (
    <section className="py-28 bg-gray-100 text-center flex flex-col items-center px-6 md:px-16">
      {/* Texto principal do banner */}
      <div className="max-w-4xl mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {titulo}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {descricao}
        </p>
      </div>

      {/* Banner interno de testemunhos */}
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-5xl py-14 px-8 md:px-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-10"
          >
            {/* Imagem da pessoa */}
            <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden shadow-md flex-shrink-0">
              <Image
                src={testemunhos[index].imagem}
                alt={testemunhos[index].nome}
                fill
                className="object-cover"
              />
            </div>

            {/* Texto do testemunho */}
            <div className="max-w-2xl text-left">
              <h3 className="text-2xl font-semibold text-gray-900">
                {testemunhos[index].nome}
              </h3>
              <p className="text-gray-600 mb-4">{testemunhos[index].cargo}</p>
              <p className="text-lg text-gray-700 italic leading-relaxed">
                “{testemunhos[index].texto}”
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botões de navegação */}
        <button
          onClick={prevTestemunho}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full shadow"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextTestemunho}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full shadow"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
