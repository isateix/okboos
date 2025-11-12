'use client';

import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard";

export default function WishlistPage() {
  const { wishlist = [] } = useWishlist(); // array sempre definido

  if (wishlist.length === 0) {
    return <p className="p-4">Nenhum produto nos desejos.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meus Desejos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((produto) => (
          <ProductCard key={produto.id} product={produto} />
        ))}
      </div>
    </div>
  );
}
