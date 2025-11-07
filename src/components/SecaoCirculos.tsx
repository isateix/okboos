"use client";

import { useState, useEffect } from "react";
import { products } from "../data/products";

export default function SecaoCirculos() {
  const [startIndex, setStartIndex] = useState(0);
  const [visible, setVisible] = useState(5);

  const ids = ["38", "39", "40", "41", "42", "43"];
  const lista = products.filter((p) => ids.includes(p.id));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisible(2);
      else if (window.innerWidth < 1024) setVisible(3);
      else setVisible(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIndex = startIndex + visible;
  const mostrado = lista.slice(startIndex, endIndex);

  return (
    <section className="w-full py-8">
      <h2 className="text-xl font-bold text-[#0071BC] mb-4 px-4 md:px-0">Destaques</h2>

      <div className="flex justify-between items-center px-4 md:px-0 mb-3">
        <button
          onClick={() => setStartIndex(Math.max(startIndex - visible, 0))}
          disabled={startIndex === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-300"
        >
          ◀
        </button>

        <button
          onClick={() =>
            setStartIndex(Math.min(startIndex + visible, lista.length - visible))
          }
          disabled={startIndex + visible >= lista.length}
          className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-300"
        >
          ▶
        </button>
      </div>

      <div className="flex gap-6 justify-center overflow-hidden">
        {mostrado.map((p) => (
          <div key={p.id} className="text-center w-24">
            <div className="w-24 h-24 rounded-full bg-gray-100 border flex items-center justify-center">
              <img src={p.image} alt={p.name} className="w-16 h-16 object-contain" />
            </div>
            <p className="mt-3 text-sm font-medium truncate">{p.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
