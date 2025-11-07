export interface Product {
  id: string;
  name: string;
  description?: string | null;
  category?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  selectedColor?: string;
  quantity?: number;
  currency?: string;
}
