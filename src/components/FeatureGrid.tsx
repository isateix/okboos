'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const features = [
  {
    id: 1,
    title: "Continue Comprando",
    images: [
      "/images/tve.png",
      "/images/arca.png",
      "/images/jogaoafas.png",
      "/images/gelerira.png",
    ],
  },
  {
    id: 2,
    title: "Mais Avaliados",
    images: [
      "/images/tenisesporte.png",
      "/images/terno.png",
      "/images/vestido.png",
      "/images/sapatossocias.png",
    ],
  },
  {
    id: 3,
    title: "Ofertas do Dia",
    images: [
      "/images/a4.jpg",
      "/images/cha.png",
      "/images/fitaadesiva.png",
      "/images/rolo.png",
    ],
  },
  {
    id: 4,
    title: "Faça Login",
    images: [
      "/images/agenda.png",
      "/images/cartucho.png",
      "/images/blocodenotas.png",
      "/images/cadeira_de_roda-removebg-preview.png",
    ],
  },
  {
    id: 5,
    title: "Dia das Crianças",
    images: [
      "/images/caixamadeira.png",
      "/images/colete.png",
      "/images/jogaoafas.png",
      "/images/gelerira.png",
    ],
  },
  {
    id: 6,
    title: "Mais Vantagens",
    images: [
      "/images/tv.png",
      "/images/microonda.png",
      "/images/jogaoafas.png",
      "/images/gelerira.png",
    ],
  },
  {
    id: 7,
    title: "Echo e Fire TV",
    images: [
      "/images/panela.jpg",
      "/images/m.jpg",
      "/images/respirador.png",
      "/images/perfume.webp",
    ],
  },
  {
    id: 8,
    title: "Ganhe Benefícios",
    images: [
      "/images/sandalia1.jpg",
      "/images/taça.png",
      "/images/tivelas.jpeg",
      "/images/vestido.png",
    ],
  },
  {
    id: 9,
    title: "Cozinha",
    images: [
      "/images/cozinha.png",
      "/images/garfo.png",
      "/images/prato.png",
      "/images/chavina.png",
    ],
  },
  {
    id: 10,
    title: "Escritório",
    images: [
      "/images/escritorio2-removebg-preview.png",
      "/images/impresora-removebg-preview.png",
      "/images/agrafos-removebg-preview.png",
      "/images/tesoura.png",
    ],
  },
  {
    id: 11,
    title: "Roupas Femininas",
    images: [
      "/images/blosa-removebg-preview.png",
      "/images/calsasocialfem-removebg-preview.png",
      "/images/saltoalto-removebg-preview.png",
      "/images/vestido.png",
    ],
  },
  {
    id: 12,
    title: "Calçados",
    images: [
      "/images/chinelas.jpg",
      "/images/chinelasplasticas.jpeg",
      "/images/crocsbranca.jpg",
      "/images/sandalia1.jpg",
    ],
  },
  {
    id: 13,
    title: "Acessórios",
    images: [
      "/images/bone.jpeg",
      "/images/chapeu.jpeg",
      "/images/gussicastanha.jpg",
      "/images/gussipreta.jpg",
    ],
  },
  {
    id: 14,
    title: "Material de Construção",
    images: [
      "/images/ferragens.jpg",
      "/images/inportar.jpg",
      "/images/materiasdetrabalho.jpg",
      "/images/transporte.png",
    ],
  },
  {
    id: 15,
    title: "Embalagens",
    images: [
      "/images/fita.jpg",
      "/images/fitacola.jpg",
      "/images/papeladerente2.png",
      "/images/papelcastanho.png",
    ],
  },
  {
    id: 16,
    title: "Descartáveis",
    images: [
      "/images/garafasplasticas.jpeg",
      "/images/guardanapo.png",
      "/images/tijelas.jpeg",
      "/images/tijelasplasticas.jpeg",
    ],
  },
  {
    id: 17,
    title: "Casa",
    images: [
      "/images/casa.jpg",
      "/images/casa1.jpg",
      "/images/casa2.jpeg",
      "/images/entrega.jpg",
    ],
  },
  {
    id: 18,
    title: "Eletrônicos",
    images: [
      "/images/10.jpg",
      "/images/11.jpg",
      "/images/12.jpg",
      "/images/13.jpg",
    ],
  },
  {
    id: 19,
    title: "Saúde",
    images: [
      "/images/protetor.png",
      "/images/respirador.png",
      "/images/sotasegurança.png",
      "/images/cadeira_de_roda-removebg-preview.png",
    ],
  },
  {
    id: 20,
    title: "Brinquedos",
    images: [
      "/images/14.jpg",
      "/images/15.jpg",
      "/images/16.jpg",
      "/images/17.jpg",
    ],
  },
  {
    id: 21,
    title: "Esportes",
    images: [
      "/images/boneesportivos.jpg",
      "/images/tenisesporte.png",
      "/images/18.jpg",
      "/images/19.jpg",
    ],
  },
  {
    id: 22,
    title: "Livros",
    images: [
      "/images/agenda.png",
      "/images/blocodenotas.png",
      "/images/8.jpg",
      "/images/9.jpg",
    ],
  },
  {
    id: 23,
    title: "Automotivo",
    images: [
      "/images/1.png",
      "/images/2.png",
      "/images/3.png",
      "/images/4.png",
    ],
  },
  {
    id: 24,
    title: "Bebês",
    images: [
      "/images/familiacomtijela.png",
      "/images/helo.webp",
      "/images/images.jpg",
      "/images/images.png",
    ],
  },
  {
    id: 25,
    title: "Novidades 1",
    images: [
      "/images/1.png",
      "/images/2.png",
      "/images/3.png",
      "/images/4.png",
    ],
  },
  {
    id: 26,
    title: "Novidades 2",
    images: [
      "/images/5.png",
      "/images/6.png",
      "/images/7.png",
      "/images/8.jpg",
    ],
  },
  {
    id: 27,
    title: "Novidades 3",
    images: [
      "/images/9.jpg",
      "/images/10.jpg",
      "/images/11.jpg",
      "/images/12.jpg",
    ],
  },
  {
    id: 28,
    title: "Novidades 4",
    images: [
      "/images/13.jpg",
      "/images/14.jpg",
      "/images/15.jpg",
      "/images/16.jpg",
    ],
  },
  {
    id: 29,
    title: "Novidades 5",
    images: [
      "/images/17.jpg",
      "/images/18.jpg",
      "/images/19.jpg",
      "/images/20.mp4",
    ],
  },
  {
    id: 30,
    title: "Novidades 6",
    images: [
      "/images/a4.jpg",
      "/images/agenda.png",
      "/images/agrafos-removebg-preview.png",
      "/images/arca.png",
    ],
  },
  {
    id: 31,
    title: "Novidades 7",
    images: [
      "/images/blocodenotas.png",
      "/images/blosa-removebg-preview.png",
      "/images/bone.jpeg",
      "/images/boneesportivos.jpg",
    ],
  },
  {
    id: 32,
    title: "Novidades 8",
    images: [
      "/images/Boss.png",
      "/images/cadeira_de_roda-removebg-preview.png",
      "/images/caixamadeira.png",
      "/images/calsasocialfem-removebg-preview.png",
    ],
  },
  {
    id: 33,
    title: "Novidades 9",
    images: [
      "/images/cartucho.png",
      "/images/casa.jpg",
      "/images/casa1.jpg",
      "/images/casa2.jpeg",
    ],
  },
  {
    id: 34,
    title: "Novidades 10",
    images: [
      "/images/cha.jpg",
      "/images/cha.png",
      "/images/chapeu.jpeg",
      "/images/chavina.png",
    ],
  },
  {
    id: 35,
    title: "Novidades 11",
    images: [
      "/images/chinela4.webp",
      "/images/chinelas.jpg",
      "/images/chinelasplasticas.jpeg",
      "/images/chinelos.jpg",
    ],
  },
  {
    id: 36,
    title: "Novidades 12",
    images: [
      "/images/colete.png",
      "/images/cozinha-removebg-preview.png",
      "/images/cozinha.png",
      "/images/crocs (2).png",
    ],
  },
  {
    id: 37,
    title: "Novidades 13",
    images: [
      "/images/crocsbranca.jpg",
      "/images/entre.jpeg",
      "/images/entrega.jpg",
      "/images/entrega.png",
    ],
  },
  {
    id: 38,
    title: "Novidades 14",
    images: [
      "/images/escritorio2-removebg-preview.png",
      "/images/facebook.png",
      "/images/familiacomtijela.png",
      "/images/ferragens.jpg",
    ],
  },
  {
    id: 39,
    title: "Novidades 15",
    images: [
      "/images/fita.jpg",
      "/images/fita.png",
      "/images/fitaadesiva.png",
      "/images/fitacola.jpg",
    ],
  },
  {
    id: 40,
    title: "Novidades 16",
    images: [
      "/images/garafasplasticas.jpeg",
      "/images/garfo.png",
      "/images/gelerira.png",
      "/images/google.png",
    ],
  },
];

export default function FeatureGrid() {
  const [visibleFeatures, setVisibleFeatures] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreFeatures = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleFeatures((prev) => prev + 4);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !isLoading
      ) {
        if (visibleFeatures < features.length) {
          loadMoreFeatures();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, visibleFeatures]);

  return (
    <section className="w-full -mt-40 px-6 py-12 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.slice(0, visibleFeatures).map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg p-6 flex flex-col text-left h-[480px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Título */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {item.title}
            </h3>

            {/* Grade de 4 imagens */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${item.title} ${index + 1}`}
                  className="w-full h-[160px] object-cover rounded-md"
                />
              ))}
            </div>

            {/* Link "Ver mais" */}
           <Link
  href={`/produtos?category=${slugify(item.title)}`}
  className="mt-4 text-blue-600 hover:text-orange-600 text-sm font-semibold text-left"
>
  Ver mais
</Link>

          </motion.div>
        ))}
      </div>
      {isLoading && (
        <div className="text-center py-4">
          <Spinner />
        </div>
      )}
    </section>
  );
}
