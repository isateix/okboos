"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image"; // ✅ import necessário
import Spinner from "./Spinner";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const features = [
  {
    id: 1,
    title: "Bicicletas infantis",
    images: ["/images/500.png","/images/501.png","/images/502.png","/images/503.png"],
  },
  {
    id: 2,
    title: "Espelhos",
    images: ["/images/504.png","/images/505.png","/images/506.png","/images/507.png"],
  },
  {
    id: 3,
    title: "Ofertas do Dia",
    images: ["/images/509.png","/images/510.png","/images/511.png","/images/512.png"],
  },
  {
    id: 4,
    title: "Faça Login",
    images: ["/images/513.png","/images/514.png","/images/515.png","/images/516.png"],
  },
];

export default function FeatureGrid() {
  const [visibleFeatures, setVisibleFeatures] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreFeatures = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleFeatures((prev) => prev + 4);
      setIsLoading(false);
    }, 500);
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
    <section className="w-full mt-6 md:mt-12 px-6 py-12 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.slice(0, visibleFeatures).map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl p-4 flex flex-col text-left shadow-md h-[420px] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Título */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>

            {/* Grade de 4 imagens */}
            <div className="grid grid-cols-2 gap-3 flex-grow">
              {item.images.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-[140px] bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 rounded-lg flex items-center justify-center shadow-inner"
                >
                  <Image
                    src={img}
                    alt={`${item.title} ${index + 1}`}
                    width={160}
                    height={140}
                    className="w-[90%] h-[90%] object-contain rounded-md"
                  />
                </div>
              ))}
            </div>

            {/* Link "Ver mais" */}
            <Link
              href={`/produtos?category=${slugify(item.title)}`}
              className="mt-4 text-purple-700 hover:text-orange-600 text-sm font-semibold text-left"
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
