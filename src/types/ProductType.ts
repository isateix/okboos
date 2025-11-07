// src/types/ProductType.ts
export type ProductType = {
  id: string;
  price: number;
  name: string;
  quantity?: number;
  image: string;
  description?: string | null;
  currency?: string;
  selectedColor?: string;
  category?: string; // 🔹 adiciona aqui
};