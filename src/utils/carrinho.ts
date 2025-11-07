import { Product } from "../types/Product";

export type ProdutoCarrinho = Product & {
  quantidade: number;
  selectedColor?: string;
};
