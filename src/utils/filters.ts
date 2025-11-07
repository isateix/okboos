import { Product } from "../types/Product";
import { products } from "../data/products";

export function filtrarPorCategoria(link: string): Product[] {
  return products.filter((produto: Product) => {
    const categoriaMap: { [key: string]: string } = {
      "Cozinha": "cozinha",
      "Eletrodomésticos": "eletrodomesticos",
      "Eletrônicos": "eletrodomesticos",
      "Brinquedos": "brinquedos",
      "Escritório": "escritorio",
      "Diversos": "diversos",
      "Bebidas": "diversos",
      "Calçados": "diversos",
      "Beleza": "diversos",
      "Decoração": "diversos",
      "Acessórios": "diversos",
      "Alimentos": "cozinha",
      "Higiene": "cozinha",
    };

    return categoriaMap[produto.category || ""] === link;
  });
}
