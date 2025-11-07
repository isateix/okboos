'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../types/Product';

type ProductImageProps = {
  product: Product;
  fill?: boolean;
};

export default function ProductImage({ product, fill }: ProductImageProps) {
  const [loading, setLoading] = useState(true);

  return fill ? (
    <Image
      src={product.image}
      fill
      alt={product.name}
      className={`object-cover transition-all duration-500 ${
        loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      width={400}
      height={400}
      alt={product.name}
      className={`object-cover transition-all duration-500 ${
        loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
