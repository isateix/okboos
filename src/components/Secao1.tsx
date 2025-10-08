"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "../data/products";

const cards = products.map(p => ({ id: p.id, title: p.name, img: p.image }));

const Secao1: React.FC = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [cardsPerView, setCardsPerView] = useState(7);

  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);



  const handleMouseEnter = (productId: string) => {

    setHoveredProductId(productId);

  };



  const handleMouseLeave = () => {

    setHoveredProductId(null);

  };



  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth >= 1280) setCardsPerView(7);

      else if (window.innerWidth >= 1024) setCardsPerView(6);

      else if (window.innerWidth >= 768) setCardsPerView(4);

      else setCardsPerView(2);



      setCurrentIndex((prev) =>

        Math.min(prev, Math.max(0, Math.ceil(cards.length / cardsPerView) - 1))

      );

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, [cards.length, cardsPerView]);



  const nextSlide = () => {

    setCurrentIndex((prev) =>

      Math.min(prev + 1, cards.length - cardsPerView)

    );

  };



  const prevSlide = () => {

    setCurrentIndex((prev) => Math.max(prev - 1, 0));

  };



  const getSimilarProducts = (productId: string) => {

    const product = products.find((p) => p.id === productId);

    if (!product || !product.category) return [];



    return products.filter(

      (p) => p.category === product.category && p.id !== productId

    ).slice(0, 3); // Limit to 3 similar products

  };



  return (

    <section className="-mt-16 pb-8 bg-green-100">

      <div className="relative px-4 overflow-hidden">

        <button

          onClick={prevSlide}

          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:opacity-50"

          disabled={currentIndex === 0}

        >

          ‹

        </button>



        <motion.div

          className="flex gap-3"

          animate={{ x: `-${currentIndex * (100 / cardsPerView)}%` }}

          transition={{ type: "spring", stiffness: 300, damping: 30 }}

        >

          {cards.map((card) => {

            const similarProducts =

              hoveredProductId === card.id

                ? getSimilarProducts(card.id)

                : [];

            return (

              <div

                key={card.id}

                className="flex-shrink-0 flex flex-col items-center relative"

                style={{ flex: `0 0 calc(${100 / cardsPerView}% - 0.75rem)` }}

                onMouseEnter={() => handleMouseEnter(card.id)}

                onMouseLeave={handleMouseLeave}

              >

                <div className="w-full aspect-square bg-green-400 rounded-md flex items-center justify-center p-2">

                  <div className="relative w-full h-full">

                    <Image

                      src={card.img}

                      alt={card.title}

                      fill

                      className="object-contain"

                    />

                  </div>

                </div>

                <p className="mt-1 text-gray-800 text-sm">

                  {card.title}

                </p>



                {hoveredProductId === card.id && similarProducts.length > 0 && (

                  <div className="absolute top-0 left-full ml-2 w-48 bg-white p-2 rounded-md shadow-lg z-20">

                    <p className="font-semibold text-sm mb-1">Similar:</p>

                    {similarProducts.map((p) => (

                      <div key={p.id} className="flex items-center mb-1">

                        <Image

                          src={p.image}

                          alt={p.name}

                          width={32}

                          height={32}

                          className="object-contain mr-2"

                        />

                        <span className="text-xs">{p.name}</span>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            );

          })}

        </motion.div>



        <button

          onClick={nextSlide}

          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:opacity-50"

          disabled={currentIndex >= cards.length - cardsPerView}

        >

          ›

        </button>

      </div>

    </section>
  );
};

export default Secao1;
