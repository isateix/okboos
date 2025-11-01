"use client";
import { useWishlist } from "../../context/WishlistContext";
import HeartButton from "../../components/HeartButton";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <p className="text-center mt-10 text-gray-500">Nenhum produto na lista de desejos.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Minha Lista de Desejos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-3 relative">
            <img
              src={`/images/Mais opções/${product.name}.png`}
              alt={product.name}
              className="w-full h-56 object-cover rounded-xl"
            />
            <div className="mt-2 text-center">
              <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
              <p className="text-[#0071BC] font-semibold mt-1">Kz {product.price}</p>
            </div>
            <div className="absolute top-3 right-3">
              <HeartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
