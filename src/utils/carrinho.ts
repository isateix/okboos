import { Product } from '../data/products';

export type ProdutoCarrinho = Product & {
  quantidade: number;
  selectedColor?: string;
};
