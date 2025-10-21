"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({ children, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const total = React.Children.count(children);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, total]);

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {React.Children.toArray(children)[index]}
        </motion.div>
      </AnimatePresence>

      {/* Botões de navegação */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:scale-110 transition-transform z-30"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % total)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:scale-110 transition-transform z-30"
      >
        ›
      </button>
    </div>
  );
}

export function CarouselContent({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full flex items-center justify-center">{children}</div>;
}
