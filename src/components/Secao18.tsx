"use client";

import Image from "next/image";
import { produtos } from "../data/products";

export default function Secao18() {
  const idsSelecionados = ["33", "35", "34", "37", "36"];
  const produtosDestaque = idsSelecionados
    .map((id) => produtos.find((p) => p.id === id))
    .filter(Boolean) as typeof produtos;

  return (
    <section className="mt-16 mb-8 p-6 bg-white w-full">
      <div className="max-w-7xl mx-auto grid gap-6 h-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {/* Esquerda - 33 */}
        <div className="relative rounded-2xl overflow-hidden bg-[#f6f3f2] flex flex-col justify-between p-4 sm:p-6 h-auto lg:min-h-[500px]">
          <div>
            <h2 className="text-3xl text-blue-900 font-semibold leading-tight">
              Eletrodomésticos
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              tudo o que você precisa
            </p>
          </div>

          <div className="flex justify-center items-center flex-1 mt-2">
            <Image
              src={produtosDestaque[0].image}
              alt="Eletrodomésticos"
              width={480} // um pouco menor para alinhar
              height={480}
              className="object-contain mx-auto"
            />
          </div>

          <button className="bg-white text-blue-900 text-sm px-5 py-2 rounded-md shadow-sm hover:bg-blue-50 transition w-fit mt-2">
            Ver mais
          </button>
        </div>

        {/* Centro */}
        <div className="flex flex-col gap-6">
          {/* Cima - 35 */}
          <div className="relative bg-[#f6f3f2] rounded-2xl overflow-hidden p-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl text-blue-900 font-semibold">Microondas</h2>
              <p className="text-gray-600 text-sm mt-1">aquece e facilita o seu dia</p>
              <button className="bg-white text-blue-900 text-sm px-4 py-1.5 rounded-md shadow-sm hover:bg-blue-50 mt-3">
                Ver mais
              </button>
            </div>
            <div className="flex justify-center items-center mt-4 sm:mt-0">
              <Image
                src={produtosDestaque[1].image}
                alt="Microondas"
                width={160}
                height={160}
                className="object-contain mx-auto"
              />
            </div>
          </div>

          {/* Baixo - 34 e 37 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {produtosDestaque.slice(2, 4).map((produto, index) => (
              <div
                key={produto.id}
                className="relative bg-[#f6f3f2] rounded-2xl overflow-hidden p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-blue-900 text-lg font-medium text-center sm:text-left">
                    {produto.name}
                  </h3>
                </div>

                <div className="flex justify-center items-center flex-1 mt-2">
                  <Image
                    src={produto.image}
                    alt={produto.name}
                    width={index === 0 ? 130 : 150}
                    height={index === 0 ? 130 : 150}
                    className="object-contain mx-auto"
                  />
                </div>

                <button className="bg-white text-blue-900 text-sm px-3 py-1 rounded-md shadow-sm hover:bg-blue-50 transition w-fit self-center sm:self-start mt-2">
                  Comprar agora
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Direita - 36 */}
        <div className="relative rounded-2xl overflow-hidden bg-[#f6f3f2] p-4 sm:p-6 flex flex-col justify-between h-auto lg:min-h-[500px]">
          <div>
            <h2 className="text-3xl text-blue-900 font-semibold leading-tight">
              Lava-louça
            </h2>
            <p className="text-gray-600 mt-1 text-base">
              praticidade e eficiência
            </p>
          </div>

          <div className="flex justify-center items-center flex-1 mt-2">
            <Image
              src={produtosDestaque[4].image}
              alt="Lava-louça"
              width={320} // menor para alinhar
              height={320}
              className="object-contain mx-auto"
            />
          </div>

          <button className="bg-white text-blue-900 text-sm px-4 py-2 rounded-md shadow-sm hover:bg-blue-50 w-fit mt-2">
            Comprar agora
          </button>
        </div>

      </div>
    </section>
  );
}
