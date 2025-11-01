"use client";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";
import Image from "next/image";

export default function ListaDesejosPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Minha Lista de Desejos ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sua lista está vazia.</h2>
          <Link
            href="/produtos"
            className="bg-[#0071BC] text-white px-6 py-3 rounded-lg hover:bg-[#005c9d] transition font-semibold"
          >
            Ver Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex-shrink-0 w-24 h-24 relative mb-4 sm:mb-0 sm:mr-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="text-lg font-bold text-gray-800">
                  {item.price.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
