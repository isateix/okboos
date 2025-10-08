"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
      "/images/jogaoagas.png",
      "/images/geleira.png",
    ],
  },
  {
    id: 6,
    title: "Mais Vantagens",
    images: [
      "/images/tv.png",
      "/images/micronda.png",
      "/images/jogaoagas.png",
      "/images/geleira.png",
    ],
  },
  {
    id: 7,
    title: "Echo e Fire TV",
    images: [
      "/images/panela.jpg",
      "/images/m.jpg",
      "/images/respirador.png",
      "/images/perfume.wbp",
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
];

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

export default function FeatureGrid() {
  return (
    <section className="w-full -mt-40 px-6 py-12 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg p-6 flex flex-col text-left h-[480px]"
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
            <Link href={`/produtos?category=${slugify(item.title)}`} legacyBehavior>
              <a className="mt-4 text-blue-600 hover:text-orange-600 text-sm font-semibold text-left">
                Ver mais
              </a>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
