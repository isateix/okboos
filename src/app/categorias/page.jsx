"use client";

import { useState } from "react";

const categorias = {
  "Todas Categorias": {
    "Em Destaque": [
      "Organizadores & Outros",
      "Verão",
      "Luzes de Neon",
      "Porta Chaves",
      "Desporto",
      "Facilitadores de Cozinha",
      "Essenciais",
      "Limpeza",
      "Acessórios para WC",
      "Garrafa de água",
      "Acessórios Carros",
      "Enfeites Para Festas",
      "Roupa de cama",
      "Sinalização",
    ],
    "Beleza e Saúde": [
      "Cosméticos",
      "Maquilhagem",
      "Higiene Pessoal",
      "Perfumes",
      "Aparelhos para penteados",
      "Necessidades",
    ],
  },
  "Eletrodoméstico": {
    "Grandes Eletrodomésticos": [
      "Esquentador de Água",
      "Máquinas De Lavar E Secar",
      "Ar Condicionados",
      "Produtos Comerciais",
      "Fogões e Fornos",
      "Geladeiras",
      "Arcas",
      "Frigobar e Bebedor",
      "Exaustor",
      "Acessórios",
    ],
    "Pequenos Eletrodomésticos": [
      "Liquidificadores",
      "Micro-ondas e Mini Fornos",
      "Grelhadores e Torradeiras",
      "Balanças e Outros",
      "Ventiladores e Aspiradores",
      "Ferros de Engomar",
      "Batedeiras e Varinhas",
    ],
    Som: ["Som", "Acessórios de TV"],
  },
  "Escritório e Escola": {
    Materiais: [
      "Diversos",
      "Agrafador e Mais",
      "Máquinas",
      "Mochilas",
      "Cadernos e Mais",
      "Capas",
      "Envelopes",
      "Papel Cartolina",
      "Consumiveis",
      "Canetas, Lápis e Mais",
      "Quadros",
      "Tintas",
      "Utilidades",
      "Tesouras",
      "Régua",
      "Cola",
      "Compasso",
    ],
    "Artigos de Escritórios": ["Cadeiras", "Armários", "Mobílias", "Cofres"],
  },
  Roupa: {
    "Roupas & Acessórios": [
      "Masculinas",
      "Femininas",
      "Meias",
      "Acessórios Masculinos",
      "Acessórios Femininos",
      "Chinelas & Sandál",
    ],
  },
  Brinquedos: {
    Brinquedos: [
      "Brinquedos Tradicionais",
      "Brinquedos Educativos",
      "Brinquedos Eletrônicos",
      "Brinquedos para Exterior",
      "Brinquedos para Bebés",
      "Acessórios e Outros",
    ],
  },
};

export default function CategoriasPage() {
  const [categoriaAberta, setCategoriaAberta] = useState(null);
  const [subcategoriaAberta, setSubcategoriaAberta] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <h1 className="text-2xl font-bold text-[#0071BC] mb-4 text-center">
        Categorias
      </h1>

      {Object.entries(categorias).map(([categoria, subcats]) => (
        <div key={categoria} className="mb-4 bg-white shadow rounded-xl p-3">
          <button
            onClick={() =>
              setCategoriaAberta(categoriaAberta === categoria ? null : categoria)
            }
            className="w-full text-left text-lg font-semibold text-[#0071BC] flex justify-between items-center"
          >
            {categoria}
            <span>{categoriaAberta === categoria ? "−" : "+"}</span>
          </button>

          {categoriaAberta === categoria && (
            <div className="mt-2 pl-4 space-y-2">
              {Object.entries(subcats).map(([subcat, itens]) => (
                <div key={subcat}>
                  <button
                    onClick={() =>
                      setSubcategoriaAberta(
                        subcategoriaAberta === subcat ? null : subcat
                      )
                    }
                    className="text-gray-800 font-medium flex justify-between w-full"
                  >
                    {subcat}
                    <span>{subcategoriaAberta === subcat ? "−" : "+"}</span>
                  </button>

                  {subcategoriaAberta === subcat && (
                    <ul className="mt-1 ml-3 text-sm text-gray-600 list-disc">
                      {itens.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
}
